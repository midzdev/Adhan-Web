import { useState } from "react";
const axios = require("axios");

export async function getServerSideProps(context) {
  const data = await fetch("https://api.pray.zone/v2/times/today.json?city=london&school=3&timeformat=1");
  const res = await data.json();

  return { props: { data: res } };
}

export default function App({ data }) {
  const [times, setTimes] = useState();
  const [input, setInput] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input) return;

    await axios
    .get(`https://api.pray.zone/v2/times/today.json?city=${input}&school=3&timeformat=1`
    .replace(" ", "-"))
      .then((res) => setTimes(res.data.results.datetime[0].times))
      .catch(() => alert("Invalid city."));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(input) => setInput(input.target.value)}
          placeholder="City"
        />
        <button>Search</button>
      </form>
      <p>
        Fajr <span>{(times && times.Fajr) || "00:00"}</span>
      </p>
      <p>
        Dhuhr <span>{(times && times.Dhuhr) || "00:00"}</span>
      </p>
      <p>
        Asr <span>{(times && times.Asr) || "00:00"}</span>
      </p>
      <p>
        Maghrib <span>{(times && times.Maghrib) || "00:00"}</span>
      </p>
      <p>
        Isha <span>{(times && times.Isha) || "00:00"}</span>
      </p>
      <br />
      <p>
        Imsak <span>{(times && times.Imsak) || "00:00"}</span>
      </p>
      <p>
        Sunrise <span>{(times && times.Sunrise) || "00:00"}</span>
      </p>
      <p>
        Sunset <span>{(times && times.Sunset) || "00:00"}</span>
      </p>
      <p>
        Midnight <span>{(times && times.Midnight) || "00:00"}</span>
      </p>
    </>
  );
}
