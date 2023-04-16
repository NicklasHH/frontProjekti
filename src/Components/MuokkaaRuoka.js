import { useState, useEffect } from "react";
import backgroundb from "../Media/backgroundb.png";
import {
  Rating,
  Box,
  Paper,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "axios";

const styles = {
  root: {
    backgroundImage: `url(${backgroundb})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    padding: "10px",
    width: "240px",
  },
};

function Dialogi({ open, onClose, onEdit, id }) {
  const [nimi, setNimi] = useState("");
  const [pvm, setPvm] = useState("");
  const [aika, setAika] = useState("");
  const [lisatiedot, setLisatiedot] = useState("");
  const [tahdet, setTahdet] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/ruoka/one/${id}`)
      .then((response) => {
        setNimi(response.data.nimi);
        setPvm(response.data.pvm);
        setAika(response.data.aika);
        setLisatiedot(response.data.lisatiedot);
        setTahdet(response.data.tahdet);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleEdit = () => {
    const data = {
      nimi: nimi,
      pvm: pvm,
      aika: aika,
      lisatiedot: lisatiedot,
      tahdet: tahdet,
    };
    axios
      .put(`http://localhost:8080/ruoka/muokkaa/${id}`, data)
      .then((response) => {
        console.log(response);
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Paper sx={{ ...styles.root }}>
        <DialogTitle>Muokkaa Ruokailua</DialogTitle>

        <TextField
          sx={{ mb: 1 }}
          label="Ruoan nimi: "
          name="nimi"
          required
          value={nimi}
          onChange={(e) => setNimi(e.target.value)}
        />
        <TextField
          sx={{ mb: 1 }}
          label="Päivämäärä: "
          name="pvm"
          value={pvm}
          onChange={(e) => setPvm(e.target.value)}
        />
        <TextField
          sx={{ mb: 1 }}
          label="Aika: "
          name="aika"
          value={aika}
          onChange={(e) => setAika(e.target.value)}
        />

        <TextField
          label="Lisätietoja: "
          name="lisatiedot"
          value={lisatiedot}
          onChange={(e) => setLisatiedot(e.target.value)}
        />

        <Box
          sx={{
            border: 1,
            mt:1,
            borderRadius: "4px",
            padding: "15px",
            display: "flex",
            borderColor: "#565957",
          }}
        >
          <Rating
            name="tahdet"
            value={Number(tahdet)}
            onChange={(e) => setTahdet(Number(e.target.value))}
          />
        </Box>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={onClose}
            sx={{
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#ff0000", color: "#FFFFFF" },
            }}
          >
            Poistu
          </Button>
          <Button
            onClick={() => {
              handleEdit();
              window.location.reload();
            }}
            sx={{
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#07F000", color: "#FFFFFF" },
            }}
          >
            Tallenna
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
}

export default function MuokkaaUni({ id }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    axios
      .get(`http://localhost:8080/uni/muokkaa/${id}`)
      .then((response) => {
        console.log(response);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <EditOutlinedIcon
          fontSize="small"
          sx={{ color: "#FFFE91", "&:hover": { color: "#07F000" } }}
        />
      </IconButton>
      <Dialogi open={open} onClose={handleClose} onEdit={handleEdit} id={id} />
    </>
  );
}
