'use client';

import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import Label from './ui/Label';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import apiService from '../services/apiService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const VotingSessionForm = ({ onSubmit = () => {}, isOpen, onClose }) => {
  const [selectedOrganizationId, setSelectedOrganizationId] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await apiService.fetchOrganizations();
        setOrganizations(data);
      } catch {
        toast.error('Failed to fetch organizations.');
      }
    };

    fetchOrganizations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const sessionData = {
      organization_id: selectedOrganizationId,
      title,
      description,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
    };

    console.log("Submitting Voting Session:", sessionData);

    try {
      await apiService.createVotingSession(sessionData);
      toast.success('Voting session created successfully!');
      onSubmit();
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error creating voting session:', error);
      toast.error('Failed to create voting session.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedOrganizationId('');
    setTitle('');
    setDescription('');
    setStartTime(new Date());
    setEndTime(new Date());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <Label>Organization</Label>
        <select
          value={selectedOrganizationId}
          onChange={(e) => setSelectedOrganizationId(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>Select an organization</option>
          {organizations.map(org => (
            <option key={org.id} value={org.id}>{org.name}</option>
          ))}
        </select>

        <Label>Title</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter title"
        />

        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Enter description"
        />

        <Label>Start Time</Label>
        <DatePicker
          selected={startTime}
          onChange={date => setStartTime(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="Pp"
          className="w-full p-2 border rounded"
        />

        <Label>End Time</Label>
        <DatePicker
          selected={endTime}
          onChange={date => setEndTime(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="Pp"
          className="w-full p-2 border rounded"
        />

        <Button type="submit" disabled={isSubmitting} className="flex items-center">
          {isSubmitting ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : 'Create Session'}
        </Button>
      </form>
    </Modal>
  );
};

export default VotingSessionForm;
