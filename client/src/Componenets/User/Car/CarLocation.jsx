import React, { useEffect, useRef, useState } from "react";

const REACT_APP_GOOGLE_MAPS_KEY  = import.meta.env.GOOGLE_MAPS_KEY

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const CarLocation= ({ setSelectedLocation,onLocationChange } ) => {
    const [query, setQuery] = useState("");
  useEffect(()=>{
    onLocationChange(query)
  },[query])

 
  
  const autoCompleteRef = useRef(null);

  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
      
        componentRestrictions: { country: "IN" },
      }
    );

    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery);
    });
  };

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = await autoComplete.getPlace();

    const query = addressObject.formatted_address;
    updateQuery(query);
    console.log({ query });

    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
    };

    console.log({ latLng });
    setSelectedLocation(latLng);
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyDe-UudexGTA40PFaMX6BLxuhiabSsXvYY&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (

   

    <div >
      
      <input
        ref={autoCompleteRef}
        className="w-full px-3 py-2 border rounded-md"
        onChange={(event) =>
            { 
           setQuery(event.target.value)
            }}
        placeholder="Search Places ..."
        value={query}
      />
    </div>
  );
};

export default CarLocation;