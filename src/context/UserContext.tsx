
import React, { createContext, useContext, useState } from "react";

interface UserWallet {
  points: number;
  discounts: {
    id: string;
    name: string;
    percentOff: number;
    pointCost: number;
  }[];
}

interface UserContextType {
  name: string;
  setName: (name: string) => void;
  role: "admin" | "user";
  setRole: (role: "admin" | "user") => void;
  wallet: UserWallet;
  addPoints: (points: number) => void;
  redeemDiscount: (discountId: string) => boolean;
  registeredEvents: string[];
  registerForEvent: (eventId: string) => void;
  cancelRegistration: (eventId: string) => void;
}

const defaultContext: UserContextType = {
  name: "Admin",
  setName: () => {},
  role: "admin",
  setRole: () => {},
  wallet: {
    points: 0,
    discounts: []
  },
  addPoints: () => {},
  redeemDiscount: () => false,
  registeredEvents: [],
  registerForEvent: () => {},
  cancelRegistration: () => {},
};

const UserContext = createContext<UserContextType>(defaultContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState("Admin");
  const [role, setRole] = useState<"admin" | "user">("admin");
  const [wallet, setWallet] = useState<UserWallet>({
    points: 100, // Starting with some points
    discounts: [
      { id: "disc1", name: "10% Off", percentOff: 10, pointCost: 50 },
      { id: "disc2", name: "25% Off", percentOff: 25, pointCost: 100 },
      { id: "disc3", name: "50% Off", percentOff: 50, pointCost: 200 }
    ]
  });
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  const addPoints = (points: number) => {
    setWallet(prev => ({
      ...prev,
      points: prev.points + points
    }));
  };

  const redeemDiscount = (discountId: string) => {
    const discount = wallet.discounts.find(d => d.id === discountId);
    if (discount && wallet.points >= discount.pointCost) {
      setWallet(prev => ({
        ...prev,
        points: prev.points - discount.pointCost
      }));
      return true;
    }
    return false;
  };

  const registerForEvent = (eventId: string) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents(prev => [...prev, eventId]);
    }
  };

  const cancelRegistration = (eventId: string) => {
    setRegisteredEvents(prev => prev.filter(id => id !== eventId));
  };

  return (
    <UserContext.Provider value={{ 
      name, 
      setName, 
      role, 
      setRole, 
      wallet, 
      addPoints, 
      redeemDiscount, 
      registeredEvents, 
      registerForEvent, 
      cancelRegistration 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
