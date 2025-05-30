import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { createElection } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Election } from '../../types';
import Button from '../common/Button';
import Input from '../common/Input';

const CreateElectionForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  });
  
  const [options, setOptions] = useState([
    { id: `option-${Date.now()}-1`, text: '' },
    { id: `option-${Date.now()}-2`, text: '' },
  ]);
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleOptionChange = (id: string, value: string) => {
    setOptions(prev => 
      prev.map(option => 
        option.id === id ? { ...option, text: value } : option
      )
    );
  };
  
  const addOption = () => {
    setOptions(prev => [
      ...prev, 
      { id: `option-${Date.now()}-${prev.length + 1}`, text: '' }
    ]);
  };
  
  const removeOption = (id: string) => {
    if (options.length <= 2) {
      setErrors(prev => ({ ...prev, options: 'At least two options are required' }));
      return;
    }
    
    setOptions(prev => prev.filter(option => option.id !== id));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.options;
      return newErrors;
    });
  };
  
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    const emptyOptions = options.filter(option => !option.text.trim());
    if (emptyOptions.length > 0) {
      newErrors.options = 'All options must have text';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const now = new Date();
      const startDate = new Date(formData.startDate);
      
      // Determine status based on dates
      let status: 'upcoming' | 'active' | 'completed' = 'upcoming';
      if (startDate <= now) {
        status = 'active';
      }
      
      const electionData: Omit<Election, 'id' | 'createdAt' | 'totalVotes'> = {
        title: formData.title,
        description: formData.description,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        status,
        createdBy: user?.id || '',
        options: options.map((option, index) => ({
          id: `${Date.now()}-${index}`,
          text: option.text,
          votes: 0
        })),
      };
      
      const response = await createElection(electionData);
      
      if (response.success && response.data) {
        navigate(`/elections/${response.data.id}`);
      } else {
        setErrors({ form: response.error || 'Failed to create election' });
      }
    } catch (error) {
      setErrors({ form: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.form && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {errors.form}
        </div>
      )}
      
      <div>
        <Input
          id="title"
          name="title"
          label="Election Title"
          placeholder="Enter the title of the election"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          required
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="Provide details about this election"
          value={formData.description}
          onChange={handleChange}
          className={`
            w-full rounded-md border px-4 py-2 text-sm shadow-sm transition-colors
            focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
            ${errors.description ? 'border-red-500' : 'border-gray-300'}
          `}
          required
        />
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            id="startDate"
            name="startDate"
            type="datetime-local"
            label="Start Date"
            value={formData.startDate}
            onChange={handleChange}
            error={errors.startDate}
            required
          />
        </div>
        
        <div>
          <Input
            id="endDate"
            name="endDate"
            type="datetime-local"
            label="End Date"
            value={formData.endDate}
            onChange={handleChange}
            error={errors.endDate}
            required
          />
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Voting Options
          </label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addOption}
            icon={<Plus size={16} />}
          >
            Add Option
          </Button>
        </div>
        
        {errors.options && <p className="mb-2 text-sm text-red-500">{errors.options}</p>}
        
        <div className="space-y-3">
          {options.map((option, index) => (
            <div key={option.id} className="flex items-center space-x-2">
              <div className="flex-grow">
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={option.text}
                  onChange={(e) => handleOptionChange(option.id, e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => removeOption(option.id)}
                className="p-2 text-gray-500 hover:text-red-500 focus:outline-none"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/admin')}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
        >
          Create Election
        </Button>
      </div>
    </form>
  );
};

export default CreateElectionForm;