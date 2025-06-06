import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Avatar,
  Tooltip,
  Link,
  Skeleton
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const isExternalUrl = url => /^https?:\/\//i.test(url);

const getFileType = (url) => {
  const ext = url.split('.').pop().toLowerCase();
  if (ext === 'pdf') return 'pdf';
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) return 'image';
  return 'other';
};

const ViewReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/reports', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReports(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch reports');
      }
      setLoading(false);
    };
    fetchReports();
  }, []);

  return (
    <Box sx={{
      maxWidth: 1200,
      margin: '40px auto',
      background: '#fff',
      borderRadius: 4,
      boxShadow: 4,
      p: { xs: 1, md: 4 }
    }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3, color: '#1976d2', letterSpacing: 1 }}>
        📑 View Reports
      </Typography>
      <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
        {loading ? (
          <Box sx={{ p: 3 }}>
            {[...Array(5)].map((_, idx) => (
              <Skeleton key={idx} variant="rectangular" height={38} sx={{ mb: 2, borderRadius: 2 }} />
            ))}
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ py: 4, textAlign: 'center' }}>{error}</Typography>
        ) : (
          <Box sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Project</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Milestone</TableCell>
                  <TableCell>Progress Details</TableCell>
                  <TableCell>Attachments</TableCell>
                  <TableCell>Created By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map(report => (
                  <TableRow key={report._id} hover>
                    <TableCell>
                      <Chip label={report.project?.name || '-'} color="primary" size="small" />
                    </TableCell>
                    <TableCell>
                      {new Date(report.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={report.status}
                        color={
                          report.status === 'Completed'
                            ? 'success'
                            : report.status === 'Ongoing'
                            ? 'primary'
                            : 'warning'
                        }
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell>{report.milestone}</TableCell>
                    <TableCell>
                      <Typography sx={{ maxWidth: 220, whiteSpace: 'pre-line' }}>
                        {report.progressdetails}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {report.attachments && report.attachments.length > 0
                        ? report.attachments.map((file, idx) => {
                            const url = isExternalUrl(file) ? file : `/${file}`;
                            const type = getFileType(url);
                            if (type === 'pdf') {
                              return (
                                <Tooltip title="PDF" key={idx}>
                                  <Link
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ display: 'inline-flex', alignItems: 'center', mr: 1, color: '#d32f2f', fontWeight: 500 }}
                                  >
                                    <PictureAsPdfIcon sx={{ mr: 0.5 }} fontSize="small" />
                                    PDF {idx + 1}
                                  </Link>
                                </Tooltip>
                              );
                            } else if (type === 'image') {
                              return (
                                <Tooltip title="Image" key={idx}>
                                  <Link
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ mr: 1 }}
                                  >
                                    <Avatar
                                      src={url}
                                      alt={`attachment-${idx}`}
                                      sx={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: 2,
                                        border: '1px solid #ccc',
                                        mr: 0.5,
                                        display: 'inline-block'
                                      }}
                                    />
                                  </Link>
                                </Tooltip>
                              );
                            } else {
                              return (
                                <Tooltip title="File" key={idx}>
                                  <Link
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ display: 'inline-flex', alignItems: 'center', mr: 1, color: '#1976d2', fontWeight: 500 }}
                                  >
                                    <InsertDriveFileIcon sx={{ mr: 0.5 }} fontSize="small" />
                                    File {idx + 1}
                                  </Link>
                                </Tooltip>
                              );
                            }
                          })
                        : <Typography color="text.secondary" variant="body2">-</Typography>}
                    </TableCell>
                    <TableCell>
                      {report.createdBy?.name
                        ? <Chip label={report.createdBy.name} color="info" size="small" />
                        : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ViewReports;