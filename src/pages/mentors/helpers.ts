import {pluralize} from "numeralize-ru";

export const getAvailableMentorsString = (count: number): string => {
  return `${count} ${pluralize(count, 'ментор', 'ментора', 'менторов')}`;
};
