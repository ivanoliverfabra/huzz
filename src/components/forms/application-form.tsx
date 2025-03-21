"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { capitalize, splitKey, tryCatch } from "@/lib/utils";
import type { Values } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Introduction } from "./pages/introduction";
import { PageFour } from "./pages/page-four";
import { PageOne } from "./pages/page-one";
import { PageThree } from "./pages/page-three";
import { PageTwo } from "./pages/page-two";

const pages = [
  {
    id: 0,
    title: "Welcome to Lil Gato's E-Kitten Application!",
    Component: Introduction,
  },
  {
    id: 1,
    title: "Introductions",
    subtitle: '"Where the huzz attttttt?" - Lil Gato',
    Component: PageOne,
  },
  {
    id: 2,
    title: "Your Valorant",
    subtitle:
      '"Cuál es tu nombre" - Worker @ Mexican Restaurant \n "215..." - Lil Gato',
    Component: PageTwo,
  },
  {
    id: 3,
    title: "Your Interests",
    subtitle: '"I want to be an E-Kitten" - Lil Gato',
    Component: PageThree,
  },
  {
    id: 4,
    title: "Gaming & Dating Preferences",
    subtitle: '"everyone > cheesecake" - Lil Gato',
    Component: PageFour,
  },
];
type Page = (typeof pages)[number];

export function ApplicationForm() {
  const { user } = useUser();

  const [values, setValues] = useState<Values>({
    name: "",
    age: "",
    username: "",
    tag: "",
    rank: "Unranked",
    about: "",
    why: "",
    availability: "",
    communicationStyle: "",
    dateExpectations: "",
    gamingPreferences: "",
  });
  const [pageNumber, setPage] = useState(0);
  const page: Page | undefined = useMemo(() => pages[pageNumber], [pageNumber]);

  const [isSubmitting, setSubmitting] = useState(false);
  const [hasSubmitted, setSubmitted] = useState(false);

  const validate = useCallback(
    (values: Record<string, string> | Values): [true, Values] | [false] => {
      const formattedValues: Record<string, string> = {};
      for (const key in values) {
        if (!(key in values)) continue;
        // @ts-expect-error - Record actually Values
        formattedValues[key] = values[key].trim();
      }

      if (
        !formattedValues.name.trim() ||
        !formattedValues.age.trim() ||
        !formattedValues.username.trim() ||
        !formattedValues.tag.trim() ||
        !formattedValues.rank.trim() ||
        !formattedValues.about.trim() ||
        !formattedValues.why.trim() ||
        !formattedValues.availability.trim() ||
        !formattedValues.communicationStyle.trim() ||
        !formattedValues.dateExpectations.trim() ||
        !formattedValues.gamingPreferences.trim()
      ) {
        return [false];
      }

      // @ts-expect-error - Record String = Values
      return [true, formattedValues];
    },
    [],
  );

  const isValid = useMemo(() => {
    const [isValid] = validate(values);
    return isValid;
  }, [values, validate]);

  const handleSubmit = useCallback(async () => {
    const toastId = toast.loading("Submitting your entry...");

    const [isValid, validData] = validate(values);
    if (!isValid)
      return toast.error("Your data is invalid.", {
        id: toastId,
      });

    setSubmitting(true);
    const [, result] = await tryCatch(
      () =>
        fetch("/api/submit", {
          method: "POST",
          body: JSON.stringify(validData),
        }).then((r) => r.json()),
      () => setSubmitting(false),
    );

    if (result.error) {
      switch (result.error) {
        case "COOLDOWN":
          toast.error(
            `You must wait ${result.timeLeft} seconds to submit another entry.`,
            {
              id: toastId,
            },
          );
          return;
        case "WEBHOOK_ERROR":
          toast.error("An error occured with our webhook.. Try again later", {
            id: toastId,
          });
          return;
        case "INVALID_PARAM":
          toast.error(`The parameter \`${result.param}\` is incorrect.`, {
            id: toastId,
          });
          return;
        case "AGE_MINIMUM":
          toast.error(`You must be atleast \`${result.minimum}\` years old.`, {
            id: toastId,
          });
          return;
        default:
          toast.error("An unknown error has occured.", {
            id: toastId,
          });
          return;
      }
    }

    toast.success("We've recieved your entry! Expect a response soon.", {
      id: toastId,
    });
    setSubmitted(true);
  }, [values, validate]);

  const changeValues = useCallback((newValues: Record<string, string>) => {
    setValues((prev) => ({ ...prev, ...newValues, }));
  }, []);

  useEffect(() => {
    const name = user?.fullName || user?.username;
    if (!name) return;
    setValues((prev) => ({ ...prev, name }))
  }, [user]);

  if (hasSubmitted) {
    return (
      <Card className="w-lg relative animate-in fade-in-0 slide-in-from-bottom-5 duration-1000">
        <CardHeader>
          <CardTitle className="font-semibold">
            🎉
            <span className="bg-gradient-to-r from-pink-400 to-primary inline-block text-transparent bg-clip-text">
              Entry Submitted!
            </span>
          </CardTitle>
          <CardDescription>
            Thank you for taking the first step towards becoming an E-Kitten, {values.name}!
            We&apos;re excited to review your application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-secondary p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Application Summary</h3>
            <ul className="space-y-4 max-h-80 overflow-y-auto py-2 px-1">
              {Object.entries(values).map(([key, value]) => (
                <li key={`entry.${key}`} className={value.length < 20 ? "flex gap-2" : "grid"}>
                  <span className="bg-card px-2 pb-1 w-fit rounded-md">{capitalize(splitKey(key))}</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-muted-foreground italic text-sm">
            We&apos;ll carefully review your application and get back to you soon. Keep an eye on your notifications! 💖
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-lg relative">
      {page?.title && (
        <CardHeader>
          <CardTitle>{page.title}</CardTitle>
          {page.subtitle && (
            <CardDescription className="flex flex-col">
              {page.subtitle.split("\n").map((str, subtitleIdx) => (
                <span key={`subtitle.${page.id}.${subtitleIdx}`}>{str}</span>
              ))}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent>
        <div className="space-y-4">
          {page?.Component && (
            page.id === 0 ? (
              // @ts-expect-error - Doesn't require any components.
              (page.Component)()
            ) : (
              <page.Component values={values} setValues={changeValues} />
            )
          )}

          <div className="flex justify-between mt-4">
            <Button
              type="button"
              variant="secondary"
              disabled={pageNumber === 0}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Back
            </Button>

            {pageNumber !== pages.length - 1 ? (
              <Button
                type="button"
                disabled={pageNumber === pages.length - 1}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? "Submitting" : "Submit"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
