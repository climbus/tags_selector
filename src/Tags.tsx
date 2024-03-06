import {
  Checkbox,
  Input,
  List,
  ListItem,
  ListItemDecorator,
  Stack,
  Typography,
} from "@mui/joy";
import { useState } from "react";

interface ITag {
  id: number;
  name: string;
}

export function Tags() {
  const [tags, setTags] = useState<ITag[]>([]);
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

  const handleChange = async (value: string) => {
    if (value.length < 3) {
      setTags([]);
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tags?phrase=${value}`,
    );
    const data = await response.json();
    setTags(data);
  };

  const handleClick = (tag: ITag) => {
    setSelectedTags([...selectedTags, tag]);
  };

  return (
    <Stack spacing={4}>
      <Typography level="h3">Tagi</Typography>
      <Input
        slotProps={{ input: { "aria-label": "phrase" } }}
        onChange={(e) => handleChange(e.target.value)}
      />
      <List>
        {tags.map((tag) => (
          <ListItem
            key={tag.id}
            slotProps={{ root: { "aria-label": tag.name } }}
            onClick={() => handleClick(tag)}
          >
            <ListItemDecorator>
              <Checkbox checked={selectedTags.includes(tag)} />
            </ListItemDecorator>
            <Typography>{tag.name}</Typography>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
