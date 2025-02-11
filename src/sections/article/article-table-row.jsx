import { useState } from "react";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Label from "../../components/label";
import Iconify from "../../components/iconify";
import EditModal from "./edit-modal";
import { useQuery } from "@tanstack/react-query";
import { getArticleById } from "../../services/article.api";

// ----------------------------------------------------------------------

export default function ArticleTableRow({
    selected,
    id,
    title,
    url,
    handleClick,
}) {
    const [open, setOpen] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const { data } = useQuery({
        queryKey: ["articleid", id],
        queryFn: () => getArticleById(id),
    });

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox
                        disableRipple
                        checked={selected}
                        onChange={handleClick}
                    />
                </TableCell>

                <TableCell component="th" scope="row">
                    <Typography variant="subtitle2" noWrap>
                        {id}
                    </Typography>
                </TableCell>

                <TableCell>{title}</TableCell>

                <TableCell>{url}</TableCell>

                <TableCell align="right">
                    <IconButton onClick={handleOpenMenu}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow>

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                    sx: { width: 140 },
                }}
            >
                <MenuItem
                    onClick={() => {
                        setShowEditModal(true);
                        handleCloseMenu();
                    }}
                >
                    <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem
                    onClick={handleCloseMenu}
                    sx={{ color: "error.main" }}
                >
                    <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
            <EditModal
                open={showEditModal}
                article={data?.data || {}}
                onClose={() => setShowEditModal(false)}
            />
        </>
    );
}

ArticleTableRow.propTypes = {
    avatarUrl: PropTypes.any,
    company: PropTypes.any,
    handleClick: PropTypes.func,
    isVerified: PropTypes.any,
    name: PropTypes.any,
    role: PropTypes.any,
    selected: PropTypes.any,
    status: PropTypes.string,
};
