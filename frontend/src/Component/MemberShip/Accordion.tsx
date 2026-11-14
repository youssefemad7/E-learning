import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../Component/ui/accordion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    value: "shipping",
    question: "What are your shipping options?",
    answer:
      "We offer standard (5–7 days), express (2–3 days), and overnight shipping. Free shipping on international orders over $50.",
  },
  {
    value: "returns",
    question: "What is your return policy?",
    answer:
      "Returns accepted within 30 days. Items must be unused and in original packaging. Refunds are processed within 5–7 business days.",
  },
  {
    value: "access",
    question: "How long do I have access to the courses?",
    answer:
      "Once enrolled, you have lifetime access to the course material — including any future updates. Learn at your own pace, on your own schedule.",
  },
  {
    value: "support",
    question: "How can I contact customer support?",
    answer:
      "Reach us via email, live chat, or phone. We respond within 24 hours during business days.",
  },
  {
    value: "certificate",
    question: "Will I receive a certificate after completion?",
    answer:
      "Yes! Upon completing a course you'll receive a verified certificate of completion that you can share on LinkedIn or your resume.",
  },
];

// ─── Main Export ──────────────────────────────────────────────────────────────

export function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="shipping"
      className="p-5 lg:w-full grid justify-center items-center"
    >
      {faqs.map(({ value, question, answer }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent className="text-[#696984] leading-relaxed ">
            {answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
