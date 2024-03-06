import {
  Checkbox,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemDecorator,
  Stack,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

interface ITag {
  id: number;
  name: string;
}

export function Tags({ initial }: { initial?: ITag[] }) {
  const [tags, setTags] = useState<ITag[]>([]);
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

  useEffect(() => {
    if (initial) {
      setSelectedTags(initial);
    }
  }, [initial]);

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
    <Stack spacing={4} sx={{ width: 260 }}>
      <Typography level="h3">Tagi</Typography>
      <Stack
        slotProps={{ root: { "aria-label": "selected tags", role: "list" } }}
        component={List}
        direction="row"
        flexWrap="wrap"
        useFlexGap
        spacing={2}
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
          height: 50,
          padding: 1,
        }}
      >
        {selectedTags.map((tag) => (
          <Typography
            key={tag.id}
            variant="outlined"
            level="body-md"
            sx={{ borderRadius: 5 }}
            endDecorator=<IconButton
              onClick={() =>
                setSelectedTags(selectedTags.filter((t) => t.id !== tag.id))
              }
            >
              <CancelPresentationIcon color="disabled" />
            </IconButton>
          >
            {tag.name}
          </Typography>
        ))}
      </Stack>
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
              <Checkbox
                checked={selectedTags.some((t) => t.name == tag.name)}
              />
            </ListItemDecorator>
            <Typography>{tag.name}</Typography>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
