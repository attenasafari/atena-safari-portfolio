"use client";

import Link from "next/link";
import { useState } from "react";
import { characters } from "@/club/categories";
import type { Trait } from "@/club/types";
import { useClub } from "@/components/club/ClubProvider";
import { Avatar, Modal } from "@/components/club/ui";

const traits: Trait[] = ["spark", "tower", "ranger", "comet"];

export function SettingsView() {
  const club = useClub();
  if (!club.ready) return <p className="pt-10 text-lg">Opening settings…</p>;
  return <SettingsForm />;
}

function SettingsForm() {
  const club = useClub();
  const [name, setName] = useState(club.state.name);
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="mx-auto max-w-xl pt-6 md:pt-8">
      <Link href="/profile" className="font-semibold text-[var(--club-purple)]">
        Profile
      </Link>
      <h1 className="display mt-3 text-5xl">Settings</h1>
      <form
        className="mt-6"
        onSubmit={(event) => {
          event.preventDefault();
          club.setName(name);
          club.toast("Name saved");
        }}
      >
        <label htmlFor="guest-name" className="display block text-2xl">
          Guest name
        </label>
        <input
          id="guest-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={24}
          className="mt-3 w-full rounded-[20px] bg-white px-4 py-3 text-lg"
        />
        <button type="submit" className="club-btn mt-4 rounded-full bg-[var(--club-purple)] px-5 py-3 font-semibold text-white">
          Save name
        </button>
      </form>

      <fieldset className="mt-8">
        <legend className="display text-2xl">Portrait</legend>
        <div className="mt-4 flex flex-wrap gap-3">
          {traits.map((trait) => (
            <button
              key={trait}
              type="button"
              aria-pressed={club.state.avatar === trait}
              onClick={() => club.setAvatar(trait)}
              className={`flex items-center gap-3 rounded-full px-3 py-2 ${
                club.state.avatar === trait ? "bg-[var(--club-purple)] text-white" : "bg-white"
              }`}
            >
              <Avatar trait={trait} size={40} alt="" />
              {characters[trait].name}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 flex items-center justify-between gap-4 rounded-[24px] bg-white p-4">
        <div>
          <p className="display text-2xl">Question timer</p>
          <p className="text-sm text-[var(--club-muted)]">20 seconds each. Turn it off if you want to linger.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={club.state.timerOn}
          onClick={() => club.setTimer(!club.state.timerOn)}
          className={`rounded-full px-4 py-2 font-semibold ${club.state.timerOn ? "bg-[var(--club-mint)]" : "bg-[#EAE7F0]"}`}
        >
          {club.state.timerOn ? "On" : "Off"}
        </button>
      </div>

      <button type="button" onClick={() => setConfirm(true)} className="mt-8 font-semibold text-[var(--club-coral)]">
        Reset progress
      </button>

      <Modal open={confirm} title="Reset the club?" onClose={() => setConfirm(false)}>
        <p>XP, streak, saved quizzes, history, and challenges you created go back to the sample start.</p>
        <button
          type="button"
          className="club-btn mt-5 rounded-full bg-[var(--club-coral)] px-5 py-3 font-semibold text-[#242334]"
          onClick={() => {
            club.resetProgress();
            setName("Guest Star");
            setConfirm(false);
          }}
        >
          Reset
        </button>
      </Modal>
    </div>
  );
}
