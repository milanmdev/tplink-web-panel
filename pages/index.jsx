import useSWR from "swr";
import Link from "next/link";
import { useAlert } from "react-alert";
import { RefreshIcon } from "@heroicons/react/solid";
import { Switch } from "@chakra-ui/react";
import devicesAPI from "./api/devices";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const alert = useAlert();
  const { data, error, mutate } = useSWR(`/api/devices`, fetcher);

  let errorResponse = (
    <main className="flex items-center justify-center m-auto">
      <div className="w-full rounded-lg bg-dark_brand-light">
        <div className="flex flex-col items-start p-4">
          <div className="flex items-center w-full">
            <div className="text-lg font-bold text-white">Error</div>
          </div>
          <hr />
          <div className="text-white">
            It looks like there was an error rendering this page.
          </div>
          <hr />
        </div>
      </div>
    </main>
  );

  let noDataResponse = (
    <main className="flex items-center justify-center m-auto">
      <div className="w-full rounded-lg bg-dark_brand-light">
        <div className="flex flex-col items-start p-4">
          <div className="flex items-center w-full">
            <div className="text-lg font-bold text-white">
              404: No Data Found
            </div>
          </div>
          <hr />
          <div className="text-white">
            No smart devices have been found. To get started, add some devices
            via the TP-Link/Kasa mobile app.
          </div>
          <hr />
        </div>
      </div>
    </main>
  );

  if (error) return errorResponse;
  if (!data) return null;
  if (!data[0]) return noDataResponse;
  console.log(data);

  setInterval(function () {
    mutate();
    document.getElementById("date").innerHTML = new Date().toLocaleString();
    console.log("Refreshing TP-Link Data");
  }, 600000);

  return (
    <>
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex relative items-end mb-4 mt-2">
          <button
            className="px-4 py-2 text-white transition duration-500 bg-gray-500 border border-gray-500 rounded-md select-none ease hover:bg-gray-600 focus:outline-none focus:shadow-outline"
            onClick={mutate}
          >
            <RefreshIcon className="w-6 inline-block" />
          </button>
          <div className="flex absolute right-0 items-end mb-4 mt-2 text-white">
            <span className="font-bold mr-1">Last Updated:</span>
            <span id="date">{new Date().toLocaleString()}</span>
          </div>
        </div>
        <div
          className={`grid grid-cols-3 -mx-1 lg:-mx-4`}
          style={{
            gridTemplateRows: `repeat(${Math.round(
              parseFloat(data.length) / 2
            )}, minmax(0, 1fr))`,
          }}
        >
          {/*flex flex-wrap*/}
          {data &&
            data.map((device, i) => {
              if (device.type == "IOT.SMARTPLUGSWITCH")
                return (
                  <div className="w-full px-4 py-4 col-span-1 flex" key={i}>
                    <div className="md:flex-1 rounded shadow-lg bg-brand-light line-clamp-1">
                      <div className="bg-brand-light w-full rounded-lg p-5 h-full">
                        <div className="text-center text-white text-3xl">
                          <h1 className="font-extrabold">{device.alias}</h1>
                        </div>
                        <div className="flex h-full">
                          <p className="mx-auto mt-4 text-xl line-clamp-1">
                            <span className="inline-block mr-2 text-white">
                              Toggle:
                            </span>
                            <Switch
                              colorScheme="teal"
                              size="lg"
                              defaultChecked={
                                parseFloat(device.status) == Number(1)
                              }
                              onChange={async function (event) {
                                event.preventDefault();

                                let id = device.id;
                                let fetchData = await fetch(
                                  "/api/devices/manage/" + id,
                                  {
                                    method: "POST",
                                    body: JSON.stringify({
                                      status: event.target.checked,
                                    }),
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                  }
                                )
                                  .then(async (res) => {
                                    return await res.json();
                                  })
                                  .catch((e) => undefined);
                                if (!fetchData)
                                  return alert.error(
                                    "An unexpected error has occured."
                                  );
                              }}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
            })}
        </div>
      </div>
    </>
  );
}
