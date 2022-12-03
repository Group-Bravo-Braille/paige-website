import React from "react";
import Header from "./font/Header";

function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...{
        ...props,
        className:
          "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full py-1 px-2",
      }}
    />
  );
}

function TextArea(
  props: React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
) {
  return (
    <textarea
      {...{
        ...props,
        className:
          "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full py-1 px-2",
        rows: 3,
      }}
    />
  );
}

function Label(
  props: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >
) {
  return (
    <label
      {...{
        ...props,
        className: "block mb-1 text-sm font-medium text-gray-900",
      }}
    />
  );
}

export default function Contact() {
  return (
    <section className="bg-white">
      <div className="flex flex-col py-8 lg:py-12 px-4 mx-auto max-w-screen-md gap-3">
        <Header>Get in touch</Header>
        <p className="text-center text-gray-500 text-sm leading-snug">
          Please fill out the form below or send us an email at{" "}
          <a href="mailto:paigebraille@outlook.com" className="underline">
            paigebraille@outlook.com
          </a>{" "}
          and we will get back to you as soon as possible.
        </p>
        <form name="contact" className="space-y-4" method="post">
          <input type="hidden" name="form-name" value="contact" />
          <div>
            <Label htmlFor="email">Email</Label>
            <FormInput
              type="email"
              name="email"
              id="email"
              placeholder="email@domain.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <FormInput
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              placeholder="How we can help you..."
            />
          </div>
          <button
            type="submit"
            className="py-2 px-3 text-sm font-medium text-center text-white rounded-sm bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
