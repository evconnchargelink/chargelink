import { useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { cn } from "../utils/cn.util";
import { LuCalendar } from "react-icons/lu";

export const DatePicker = ({
  className,
  setDate,
  date,
  isTimeShown = false,
}: {
  className?: string;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  date: Date;
  isTimeShown?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Dayjs | null) => {
    if (!date) return { date: "" };
    return {
      date: date.format("dddd, MMMM D, YYYY"),
    };
  };

  const { date: formattedDate } = formatDate(dayjs(date));

  return (
    <>
      <div
        ref={anchorRef}
        className={cn(
          "w-full flex items-center space-x-4 p-3 border-[0.8px] border-black rounded-lg px-3 py-2 cursor-pointer",
          className || ""
        )}
        onClick={() => setOpen(true)}
      >
        <LuCalendar className="text-black text-sm" />

        <div className="flex items-center space-x-2">
          <p className="text-xs text-black font-medium">{formattedDate}</p>
        </div>
      </div>

      {/* Hidden DateTimePicker */}
      <DateTimePicker
        views={
          isTimeShown
            ? ["day", "month", "year", "hours", "minutes"]
            : ["day", "month", "year"]
        }
        value={dayjs(date)}
        onChange={(newValue) => {
          setDate(newValue?.toDate() || new Date());
        }}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        slotProps={{
          textField: {
            sx: { display: "none" },
          },
          popper: {
            anchorEl: anchorRef.current,
            placement: "top-start",
          },
        }}
      />
    </>
  );
};
