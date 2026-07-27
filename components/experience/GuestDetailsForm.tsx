"use client";

import { motion } from "motion/react";
import { FormEvent, useState } from "react";
import type { GuestDetails } from "@/lib/guest-registration";

export type { GuestDetails } from "@/lib/guest-registration";

export function GuestDetailsForm({
  onComplete,
}: {
  onComplete: (details: GuestDetails) => Promise<void> | void;
}) {
  const [details, setDetails] = useState<GuestDetails>({
    birthDate: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      await onComplete({
        ...details,
        email: details.email.trim(),
        firstName: details.firstName.trim(),
        lastName: details.lastName.trim(),
      });
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We could not save your invitation. Please try again.",
      );
      setIsSaving(false);
    }
  };

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="guest-details"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="guest-details-art" />
      <form className="guest-details-form" onSubmit={submit}>
        <p>FEVER</p>
        <h1>Before we begin.</h1>
        <span>COMPLETE YOUR PRIVATE INVITATION</span>

        <label>
          <span>FIRST NAME</span>
          <input
            autoComplete="given-name"
            name="firstName"
            onChange={(event) =>
              setDetails((current) => ({
                ...current,
                firstName: event.target.value,
              }))
            }
            required
            value={details.firstName}
          />
        </label>

        <label>
          <span>LAST NAME</span>
          <input
            autoComplete="family-name"
            name="lastName"
            onChange={(event) =>
              setDetails((current) => ({
                ...current,
                lastName: event.target.value,
              }))
            }
            required
            value={details.lastName}
          />
        </label>

        <label>
          <span>DATE OF BIRTH</span>
          <input
            autoComplete="bday"
            name="birthDate"
            onChange={(event) =>
              setDetails((current) => ({
                ...current,
                birthDate: event.target.value,
              }))
            }
            required
            type="date"
            value={details.birthDate}
          />
        </label>

        <label>
          <span>EMAIL</span>
          <input
            autoComplete="email"
            name="email"
            onChange={(event) =>
              setDetails((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            required
            type="email"
            value={details.email}
          />
        </label>

        <button disabled={isSaving} type="submit">
          {isSaving ? "SECURING YOUR INVITATION..." : "CONTINUE"}
        </button>
        {error ? <small role="alert">{error}</small> : null}
        <small>
          YOUR DETAILS SECURE THIS INVITATION AND PERSONALIZE YOUR WALLET PASS.
        </small>
      </form>
    </motion.section>
  );
}
