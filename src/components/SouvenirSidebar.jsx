import {
    Sidebar,
    SidebarBody,
    SidebarContent,
    SidebarLink
} from "./SidebarCore.jsx";

const SouvenirSidebar = () => {
    return (
        <Sidebar>
            <SidebarBody>
                <SidebarLink icon={"🎨"} label="Màu sắc" />
                <SidebarLink icon={"📍"} label="Vị trí logo" />
                <SidebarLink icon={"📝"} label="Văn bản" />
                <SidebarContent />
            </SidebarBody>
        </Sidebar>
    );
};

export default SouvenirSidebar;
