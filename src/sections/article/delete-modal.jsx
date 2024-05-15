import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { deleteArticleById } from "../../services/article.api";
import Swal from "sweetalert2";

import Iconify from "../../components/iconify";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "20%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function DeleteModal(prop) {
    const { id, title } = prop.article;

    const handleDeleteArticle = async () => {
      const response = await deleteArticleById(id)

      if (response.status == 200) {
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: "true",
        }).fire({
            icon: "success",
            title: "\n\nDelete article successfully. Please refresh page.",
        });
      } else {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: "true",
        }).fire({
            icon: "error",
            title: "\n\nDelete article failed"
        });
      }
    }

    return (
        <Modal
            {...prop}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Remove Article {id}
                </Typography>
                <p>
                  Do you want to remove article {id}: "{title}" ? You can not restore this article after delete.
                </p>
                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="eva:checkmark-fill" />}
                    onClick={handleDeleteArticle}
                >
                    Confirm
                </Button>
            </Box>
        </Modal>
    );
}
