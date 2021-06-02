import TimeAgo from "javascript-time-ago";
import fa from "javascript-time-ago/locale/fa";
import en from "javascript-time-ago/locale/en";
import ar from "javascript-time-ago/locale/ar";
import tr from "javascript-time-ago/locale/tr";

import useStorage from "reducer";

export default function useTimeAgo() {
  const {
    setting: { lang = "fa" },
  } = useStorage();
  TimeAgo.addLocale(fa);
  TimeAgo.addLocale(en);
  TimeAgo.addLocale(ar);
  TimeAgo.addLocale(tr);
  return new TimeAgo(lang);
}
