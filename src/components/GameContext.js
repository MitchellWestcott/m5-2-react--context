import React, { createContext } from "react";
import { useInterval } from "../hooks/use-interval.hook";
import usePersistedState from "../hooks/use-persisted-state.hook";

import { items } from "./Data";

export const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = usePersistedState(1000, "num-cookies");
  const [timeClosed, setTimeClosed] = usePersistedState(
    new Date().getTime(),
    "time-closed"
  );

  const [purchasedItems, setPurchasedItems] = usePersistedState(
    {
      cursor: 0,
      grandma: 0,
      farm: 0,
    },
    "purchased-items"
  );

  const calculateCookiesPerSecond = (purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      const value = item.value;

      return acc + value * numOwned;
    }, 0);
  };

  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        timeClosed,
        setTimeClosed,
        cookiesPerSecond: calculateCookiesPerSecond(purchasedItems),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
