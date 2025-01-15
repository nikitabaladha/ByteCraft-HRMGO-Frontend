import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getAPI from "../../../../api/getAPI";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import postAPI from "../../../../api/postAPI";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const TicketReply = () => {
    const [attachment, setAttachment] = useState(null);
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);
    const [replies, setReplies] = useState([]);
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const removeHtmlTags = (text) => {
        return text.replace(/<[^>]*>/g, '');
    };

    const descriptionWithoutHtml = ticket ? removeHtmlTags(ticket.description) : '';

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await getAPI(`/ticket-get/${ticketId}`, {}, true);
                if (response.data.ticket) {
                    setTicket(response.data.ticket);
                } else {
                    toast.error("Failed to fetch ticket data");
                }
            } catch (error) {
                toast.error("Failed to fetch ticket data");
            } finally {
                setIsLoading(false);
            }
        };
        fetchTicket();
    }, [ticketId]);

    useEffect(() => {
        const fetchTicketReplies = async () => {
            try {
                const repliesResponse = await getAPI(`/ticket-reply/${ticketId}`, {}, true);
                const fetchedReplies = repliesResponse.data.replies || [];
                setReplies(fetchedReplies);
            } catch (error) {
                toast.error("Failed to fetch replies");
            }
        };

        fetchTicketReplies();
    }, [ticketId]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAttachment(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const ticketData = new FormData();
        ticketData.append('ticketId', ticketId);
        ticketData.append('description', description);

        if (attachment) {
            ticketData.append('attachment', attachment, attachment.name);
        }

        try {
            const response = await postAPI('/create_TicketReply', ticketData, {
                'Content-Type': 'multipart/form-data',
            }, true);

            if (!response.hasError) {
                toast.success("Reply sent successfully!");
                setDescription('');
                setAttachment(null);
            } else {
                toast.error(`Failed to send reply: ${response.message}`);
            }
        } catch (error) {
            toast.error("An error occurred while sending the reply.");
        }
    };

    dayjs.extend(relativeTime);

    return (
        <div className="dash-content">
            <div className="row">
                <div className="col-12">
                    <div className="row gy-4">
                        <div className="col-lg-6">
                            <div className="row">
                                {isLoading ? (
                                    <div>Loading ticket...</div>
                                ) : (
                                    ticket && (
                                        <>
                                            <h5 className="mb-3">Reply Ticket - <span className="text-success">0{ticket.ticket_code}</span></h5>
                                            <div className="card border">
                                                <div className="card-body p-0">
                                                    <div className="p-4 border-bottom">
                                                        <div className={`badge bg-${ticket.priority === "medium"
                                                            ? "info"
                                                            : ticket.priority === "critical"
                                                                ? "danger"
                                                                : ticket.priority === "high"
                                                                    ? "warning"
                                                                    : "success"} mb-2`}>
                                                            {ticket.priority}
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <h5>{ticket.title}</h5>
                                                            <span className={`badge bg-${ticket.status === "open"
                                                                ? "light-primary"
                                                                : ticket.status === "onhold"
                                                                    ? "light-warning"
                                                                    : "light-danger"
                                                                } p-2 f-w-600`}>
                                                                {ticket.status}
                                                            </span>
                                                        </div>
                                                        <p className="mb-0">
                                                            <b>{ticket.created_by}</b>
                                                            .
                                                            <span> company@example.com</span>
                                                            .
                                                            <span className="text-muted">{new Date(ticket.created_date).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}</span>
                                                        </p>
                                                    </div>
                                                    <div className="p-4">
                                                        <p>{descriptionWithoutHtml}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                )}
                            </div>

                            {ticket && ticket.status !== 'close' && ticket.status !== 'onhold' && (
                                <div className="row">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="mb-3">Comments</h5>
                                            <form method="POST" onSubmit={handleSubmit} acceptCharset="UTF-8" encType="multipart/form-data">
                                                <ReactQuill
                                                    value={description}
                                                    onChange={setDescription}
                                                    theme="snow"
                                                    placeholder="Enter the ticket description here"
                                                    style={{ height: '220px', maxHeight: '270px', minHeight: '200px', marginBottom: '3.0rem' }}
                                                />

                                                <div className="row">
                                                    <div className="form-group col-md-6" style={{ marginBottom: '1.5rem' }}>
                                                        <label htmlFor="attachment" className="form-label">Attachments</label>
                                                        <div class="col-sm-12 col-md-12">
                                                            <div class="form-group col-lg-12 col-md-12">
                                                                <div class="choose-file form-group">
                                                                    <label for="file" class="form-label">
                                                                        <input
                                                                            type="file"
                                                                            name="attachment"
                                                                            id="attachment"
                                                                            className="form-control"
                                                                            onChange={handleFileChange}
                                                                        />
                                                                        <div class="invalid-feedback">
                                                                        </div>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group col-md-4">
                                                        <label class="form-label"></label>
                                                        <div class="col-sm-12 col-md-12">
                                                            <div class="form-group col-lg-12 col-md-12">
                                                                {attachment && <img src={URL.createObjectURL(attachment)} alt="Attachment Preview" id="blah" width="60%" />}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-end">
                                                    <button type="submit" className="btn btn-sm bg-primary w-100" style={{ color: 'white' }}>
                                                        <i className="ti ti-circle-plus me-1 mb-0"></i> Send
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="col-lg-6">
                            {ticket && ticket.status !== 'onhold' && (
                                <>
                                    <h5 className="mb-3">Replies</h5>
                                    {replies.length > 0 ? (
                                        replies.map((reply, index) => (
                                            <div key={reply._id || index} className="card border">
                                                <div className="card-header row d-flex align-items-center justify-content-between">
                                                    <div className="header-right col d-flex align-items-start">
                                                        <Link to="#" className="avatar avatar-sm me-3">
                                                            <img alt="" className="img-fluid rounded border-2 border border-primary" width="50px" style={{ height: '50px' }} src="https://demo.workdo.io/hrmgo/storage/uploads/avatar//user-1.jpg" />
                                                        </Link>
                                                        <h6 className="mb-0">{ticket.created_by}
                                                            <div className="d-block text-muted">
                                                                company@example.com
                                                            </div>
                                                        </h6>
                                                    </div>
                                                    <p className="col-auto ms-1 mb-0"> <span className="text-muted">{dayjs(reply.createdAt).fromNow()}</span></p>
                                                </div>

                                                <div className="p-4">
                                                    <p>{reply.description ? removeHtmlTags(reply.description) : 'No description available'}</p>

                                                    {/* {reply.attachment && (
                                                        <div className="mt-3">
                                                            <img src={`http://localhost:3001${reply.attachment}`}
                                                                alt="Reply Attachment"
                                                                width="30%" />
                                                        </div>
                                                    )} */}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-4">No replies yet.</div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketReply;
