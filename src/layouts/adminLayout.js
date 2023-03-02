import Sidebar from "../component/admin/Sidebar";
function AdminLayout({ children }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100vh",
        display: "flex",
      }}
    >
      <Sidebar />
      {children}
    </div>
  );
}

export default AdminLayout;
