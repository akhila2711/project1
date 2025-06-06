import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Link, Chip
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import axios from '../../api/axios';

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

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/reports/client', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReports(res.data);
      } catch {
        setReports([]);
      }
      setLoading(false);
    };
    fetchReports();
  }, []);

  return (
    <Box sx={{ maxWidth: 1100, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        📄 Project Reports
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : reports.length === 0 ? (
        <Typography>No reports found for your projects.</Typography>
      ) : (
        <Paper sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Milestone</TableCell>
                <TableCell>Progress Details</TableCell>
                <TableCell>Attachments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map(report => (
                <TableRow key={report._id}>
                  <TableCell>{report.project?.name || '-'}</TableCell>
                  <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip label={report.status} color={
                      report.status === 'Completed'
                        ? 'success'
                        : report.status === 'Ongoing'
                        ? 'primary'
                        : 'warning'
                    } />
                  </TableCell>
                  <TableCell>{report.milestone}</TableCell>
                  <TableCell>{report.progressdetails}</TableCell>
                  <TableCell>
                    {report.attachments && report.attachments.length > 0
                      ? report.attachments.map((file, idx) => {
                          const url = isExternalUrl(file) ? file : `${file}`;
                          const type = getFileType(url);
                          if (type === 'pdf') {
                            return (
                              <Link
                                key={idx}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 1 }}
                              >
                                <PictureAsPdfIcon color="error" sx={{ mr: 0.5 }} />
                                PDF {idx + 1}
                              </Link>
                            );
                          } else if (type === 'image') {
                            return (
                              <Link
                                key={idx}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ mr: 1 }}
                              >
                                <img
                                  src={url}
                                  alt={`attachment-${idx}`}
                                  style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4, border: '1px solid #ccc' }}
                                />
                              </Link>
                            );
                          } else {
                            return (
                              <Link
                                key={idx}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 1 }}
                              >
                                <InsertDriveFileIcon sx={{ mr: 0.5 }} />
                                File {idx + 1}
                              </Link>
                            );
                          }
                        })
                      : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default ViewReports;