import React from "react";
import { api } from "npm/utils/api";
import dayjs from "dayjs";

const ScheduleView = () => {

  const { data, isLoading, isError, error } = api.schedule.getPlannedGameNights.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {data.data.date.map((d, index) => (
        <div key={index}>
          {dayjs(d).format("DD.MM.YYYY")}
        </div>
      ))}
    </>);
};

export default ScheduleView;