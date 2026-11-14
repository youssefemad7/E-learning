import {
  Twitter,
  Facebook,
  Youtube,
  Instagram,
  Send,
  MessageCircle,
} from "lucide-react";

interface CoinRewardCardProps {
  title: string;
  subtitle: string;
  description: string;
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Send, href: "#", label: "Telegram" },
  { icon: MessageCircle, href: "#", label: "WhatsApp" },
];

export function CoinRewardCard({
  title,
  subtitle,
  description,
}: CoinRewardCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug">
            {title}
          </h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>

        {/* Social icons — fixed: flex-wrap so they don't overflow on small screens */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="w-8 h-8 rounded-full bg-[#3bb3bd] flex items-center justify-center text-white hover:bg-[#2d9ca6] active:scale-95 transition-all"
            >
              <social.icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </div>

      {/* Description box */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
