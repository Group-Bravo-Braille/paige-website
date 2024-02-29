const translateUrl = "http://0.0.0.0:8080/translate";
const backtranslateUrl = "http://0.0.0.0:8080/backtranslate";
const nextCharacterUrl = "http://0.0.0.0:8080/nextcharacter";
const getContractionUrl = "http://0.0.0.0:8080/getcontraction";

interface TranslationResult {
  braille: string;
}

interface BacktranslationResult {
  text: string;
}

interface NextCharactersResult {
  pred: string[];
}

interface CharactersToBrailleAscii {
  braille: string[];
}

interface PredExists {
  exists: boolean;
}

interface GetContraction {
  correction: string
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

// Function to get nextCharacter based on entered text
export const nextCharacters = async (
  text: string,
  tableName: string,
): Promise<string[] | null> => {
  const requestBody = {
    text: text,
    tableList: [tableName],
  };

  try {
    const response = await fetch(nextCharacterUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const result: NextCharactersResult = await response.json();
      return result.pred;
    } else {
      console.error("Next Character Predicition failed:", response.statusText);
      return null;
    }
  } catch (error: any) {
    console.error("Error during Next Character Prediction:", error.message);
    return null;
  }
};

// Function to get contraction corrections based on input text
export const getContraction = async (
  braille: string,
  tableName: string,
): Promise<string | null> => {
  const requestBody = {
    braille: braille,
    tableList: [tableName],
  };

  try {
    const response = await fetch(getContractionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const result: GetContraction = await response.json();
      return result.correction;
    } else {
      console.error("Contraction correction failed:", response.statusText);
      return null;
    }
  } catch (error: any) {
    console.error("Error during contraction correction:", error.message);
    return null;
  }
};

export const translateAndUpdate = async (
  inputText: string,
  selectedTable: string,
  setPrintText: React.Dispatch<React.SetStateAction<string>>,
  setSpokenFeedback: React.Dispatch<React.SetStateAction<string>> | null,
  setHintText: React.Dispatch<React.SetStateAction<string>>,
  setContracitonText: React.Dispatch<React.SetStateAction<string>>,
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

    // Get nextCharacter based on sanitized print text
    const nextCharacterList = await nextCharacters(sanitizedText, selectedTable);
    if (nextCharacterList !== null) {
      var nextCharacterString = "";
      for (var i = 0; i < nextCharacterList.length; i++) {
        nextCharacterString += nextCharacterList[i];
      }
      setHintText(nextCharacterString);
      console.log(nextCharacterList);
    } else {
      setHintText("");
    }

    // Get contraction corrections based on last word in braille ascii
    var lastWordBraille = lines[lines.length - 1].split(" ").slice(-1)[0];
    const contraction = await getContraction(lastWordBraille, selectedTable);
    if (contraction && contraction !== lastWordBraille) {
      setContracitonText(contraction);
    } else {
      setContracitonText("")
    }

  } catch (error) {
    console.error("Error during translation:", error);
    console.log("Fail");
  }
};
