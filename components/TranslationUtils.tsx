const translateUrl = "https://www.paige.ninarimsky.com/translate";
const backtranslateUrl = "https://www.paige.ninarimsky.com/backtranslate";
const suggestionUrl = "http://0.0.0.0:8080/glenda";

interface TranslationResult {
  braille: string;
}

interface BacktranslationResult {
  text: string;
}

interface suggestionResult {
  text: string;
}

// Function to translate ASCII Braille to print
export const translateToPrint = async (
  asciiBraille: string,
  tableName: string,
): Promise<string | null> => {
  const requestBody = {
    text: asciiBraille,
    tableList: [tableName],
  };

  try {
    const response = await fetch(translateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const result: TranslationResult = await response.json();
      return result.braille;
    } else {
      console.error("Translation failed:", response.statusText);
      return null;
    }
  } catch (error: any) {
    console.error("Error during translation:", error.message);
    return null;
  }
};

// Function to backtranslate Braille to ASCII
export const backtranslateToASCII = async (
  braille: string,
  tableName: string,
): Promise<string | null> => {
  const requestBody = {
    braille: braille,
    tableList: [tableName],
  };

  try {
    const response = await fetch(backtranslateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const result: BacktranslationResult = await response.json();
      return result.text;
    } else {
      console.error("Backtranslation failed:", response.statusText);
      return null;
    }
  } catch (error: any) {
    console.error("Error during backtranslation:", error.message);
    return null;
  }
};

// Function to get suggestion based on entered text
export const getSuggestion = async (
  text: string,
  tableName: string,
): Promise<string | null> => {
  const requestBody = {
    text: text,
    tableList: [tableName],
  };

  try {
    const response = await fetch(suggestionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const result: suggestionResult = await response.json();
      return result.text;
    } else {
      console.error("suggestion failed:", response.statusText);
      return null;
    }
  } catch (error: any) {
    console.error("Error during suggestion:", error.message);
    return null;
  }
};

export const translateAndUpdate = async (
  inputText: string,
  selectedTable: string,
  setPrintText: React.Dispatch<React.SetStateAction<string>>,
  setSpokenFeedback: React.Dispatch<React.SetStateAction<string>> | null,
  setHintText: React.Dispatch<React.SetStateAction<string>>,
) => {
  try {
    const lines = inputText.split("\n");

    // Translate each line independently
    const translatedLines = await Promise.all(
      lines.map(async (line) => {
        return await backtranslateToASCII(line, selectedTable);
      }),
    );

    // Join the translated lines back together
    const translation = translatedLines.join("\n");
    console.log(translation);
    // Replace characters between "\ and /" with their Unicode representations
    const sanitizedText = translation.replace(/\\(.*?)\//g, " ");
    setPrintText(sanitizedText);
    // Conditionally set setSpokenFeedback if it is not null
    const words = sanitizedText.split(/[ \n]+/);
    if (setSpokenFeedback !== null) {
      setSpokenFeedback(words[words.length - 2]);
    }

    // Get suggestion based on sanitized print text
    const suggestion = await getSuggestion(sanitizedText, selectedTable);
    if (suggestion !== null) {
      setHintText(suggestion);
    } else {
      setHintText("");
    }

  } catch (error) {
    console.error("Error during translation:", error);
    console.log("Fail");
  }
};
