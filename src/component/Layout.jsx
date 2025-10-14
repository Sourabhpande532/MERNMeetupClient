// src/Layout.jsx
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout = ({ search, setSearch, type, setType }) => {
  return (
    <div className="container bg-color">
      {/* ✅ Header is now inside Router */}
      <Header search={search} setSearch={setSearch} type={type} setType={setType} />
      <hr />
      <Outlet /> {/* This renders App or DetailsEvent */}
    </div>
  );
};
