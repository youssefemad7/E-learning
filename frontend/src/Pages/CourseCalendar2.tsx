import { CourseLayout } from "../Component/coursecalendar2/course-layout";
import { CoinRewardCard } from "../Component/coursecalendar2/coin-reward-card";
import { coinRewards } from "../lib/course-data";

export default function CourseCalendar2() {
  return (
    <CourseLayout>
      <div className="max-w-8xl w-full">
        {/* Page Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Share and Refer
        </h2>

        {/* Description — fixed: cleaned up the lorem ipsum repetition */}
        <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-2xl">
          Invite your friends and colleagues to join the platform and earn coin
          rewards for every successful referral. Share via your preferred social
          network and start earning today.
        </p>

        {/* Reward Cards */}
        <div className="space-y-5">
          {coinRewards.map((reward) => (
            <CoinRewardCard
              key={reward.id}
              title={reward.title}
              subtitle={reward.subtitle}
              description={reward.description}
            />
          ))}
        </div>
      </div>
    </CourseLayout>
  );
}
