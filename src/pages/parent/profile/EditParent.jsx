
import {
  Card,
  TextInput,
  Button,
  Stack,
  Title,
  Loader,
  Center,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateParentProfile } from "../../../features/parent/parentProfileSlice";
import { useNavigate } from "react-router-dom";

const EditParent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, loading } = useSelector(
    (state) => state.parentProfile
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

 
  useEffect(() => {
    if (profile) {
      setName(profile.fullName || "");
      setPhone(profile.mobile || "");
    }
  }, [profile]);

  
  if (!profile) {
    return (
      <Center mt="xl">
        <Loader color="violet" />
      </Center>
    );
  }

  const handleUpdate = async () => {
    await dispatch(updateParentProfile({ name, phone }));
    navigate("/parent/profile");
  };

  return (
    <div className="p-4">
      <Card radius="xl" shadow="sm" withBorder p="lg">
        <Title order={4} mb="md">
          Edit Parent Details
        </Title>

        <Stack>
          <TextInput
            label="Parent Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <TextInput
            label="Phone"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <Button
            radius="xl"
            loading={loading}
            onClick={handleUpdate}
            style={{
              background:
                "linear-gradient(90deg,#8B5CF6,#6366F1)",
            }}
          >
            Update
          </Button>
        </Stack>
      </Card>
    </div>
  );
};

export default EditParent;