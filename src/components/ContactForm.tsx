import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form Data:", data);
    setIsSubmitted(true);

    setTimeout(() => {
      reset();
      setIsSubmitted(false);
    }, 3000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <div className="submit-box">
      {isSubmitted && (
        <div>
          <h2>✓ Your message has been sent successfully!</h2>
        </div>
      )}
      <form onSubmit={handleFormSubmit}>
        <div className="input-box">
          <label htmlFor="name">
            Name <span className="star">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
              maxLength: {
                value: 50,
                message: "Name must not exceed 50 characters",
              },
            })}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p>
              <span>⚠</span>
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="input-box">
          <label htmlFor="email">
            Email <span className="star">*</span>
          </label>
          <input
            id="email"
            type="text"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
            placeholder="example@email.com"
          />
          {errors.email && (
            <p>
              <span>⚠</span>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="input-box">
          <label htmlFor="message">
            Message <span className="star">*</span>
          </label>
          <textarea
            id="message"
            rows="5"
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters",
              },
              maxLength: {
                value: 500,
                message: "Message must not exceed 500 characters",
              },
            })}
            placeholder="Write your message here..."
          />
          {errors.message && (
            <p>
              <span>⚠</span>
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleFormSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
}
