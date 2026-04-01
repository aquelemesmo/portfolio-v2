export type ProjectCategory =
    | "Minecraft Server"
    | "Website (Front-End)"
    | "Discord Bot"
    | "Video Editor";

export type ProjectType = {
    title: string;
    category: ProjectCategory;
    description?: string;
    image?: string;
    link?: string;
    media?: string[];
    gifs?: string[];
}
