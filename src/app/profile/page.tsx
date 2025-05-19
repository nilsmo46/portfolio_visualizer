"use client"

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from '@/lib/axios';;
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import { toast } from "sonner";
import { baseURL } from '@/constants';

type FormField = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'optional';
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
};

type FormValues = {
  profileType: string;
  country: string;
  marketRegion: string;
  firstName: string;
  lastName: string;
  businessEmail: string;
  company?: string;
  firmType: string;
};

const Profile: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormValues>({
    defaultValues: {
      profileType: '',
      country: '',
      marketRegion: '',
      firstName: '',
      lastName: '',
      businessEmail: '',
      company: '',
      firmType: '',
    }
  });

  useEffect(() => {
    async function initializeProfile() {
      setLoading(true);
      
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const verifyRes = await axios.get(`${baseURL}/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (verifyRes.data) {
          try {
            const profileRes = await axios.get(`${baseURL}/auth/me`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            console.log(profileRes.data);
            if (profileRes.data) {
              const nameParts = profileRes.data.name.split(" ");
              const firstName = nameParts[0];
              const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
              
              setValue('profileType', profileRes.data.role || '');
              setValue('country', profileRes.data.country || '');
              setValue('marketRegion', profileRes.data.market_region || '');
              setValue('firstName', firstName || '');
              setValue('lastName', lastName || '');
              setValue('businessEmail', profileRes.data.email || '');
              setValue('company', profileRes.data.company || '');
              setValue('firmType', profileRes.data.firm_type || '');
            }
          } catch (error) {
            console.error("Failed to fetch profile:", error);
            toast.error("Failed to load profile data");
          }
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }
    
    initializeProfile();
  }, [router, reset, setValue]);

  const onSubmit = async (data: FormValues) => {
    setUpdating(true);
    const payload = {
      fullName: data.firstName + " " + data.lastName,
      businessEmail: data.businessEmail,
      profileType: data.profileType,
      company: data.company,
      country: data.country,
      firmType: data.firmType,
      marketRegion: data.marketRegion,
    };
    
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${baseURL}/auth/update`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const configFields: FormField[] = [
    {
      id: 'profileType',
      label: 'Profile Type',
      type: 'select',
      options: [
        { value: 'INDIVIDUAL_INVESTOR', label: 'Individual Investor' },
        { value: 'PROFESSIONAL_ADVISOR', label: 'Professional Advisor' },
        { value: 'INSTITUTION', label: 'Institution' }
      ],
      required: true
    },
    {
      id: 'country',
      label: 'Country',
      type: 'select',
      options: [
        { value: 'INDIA', label: 'India' },
        { value: 'UNITED_STATES', label: 'United States' },
        { value: 'UNITED_KINGDOM', label: 'United Kingdom' },
        { value: 'CANADA', label: 'Canada' }
      ],
      required: true
    },
    {
      id: 'marketRegion',
      label: 'Market Region',
      type: 'select',
      options: [
        { value: 'NORTH_AMERICA', label: 'North America' },
        { value: 'EUROPE', label: 'Europe' },
        { value: 'ASIA_PECIFIC', label: 'Asia Pacific' },
        { value: 'GLOBAL', label: 'Global' }
      ],
      required: true
    }
  ];

  const accountFields: FormField[] = [
    {
      id: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true
    },
    {
      id: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true
    },
    {
      id: 'businessEmail',
      label: 'Business Email',
      type: 'email',
      required: true
    },
    {
      id: 'company',
      label: 'Company',
      type: 'optional',
      placeholder: 'Optional'
    },
    {
      id: 'firmType',
      label: 'Firm Type',
      type: 'select',
      options: [
        { value: 'BROKER_DEALER', label: 'Broker-Dealer' },
        { value: 'RIA', label: 'RIA' },
        { value: 'BANK', label: 'Bank' },
        { value: 'ASSET_MANAGER', label: 'Asset Manager' }
      ],
      required: true
    }
  ];

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'select':
        return (
          <Controller
            name={field.id as keyof FormValues}
            control={control}
            rules={{ required: field.required ? 'This field is required' : false }}
            render={({ field: { onChange, value, name } }) => (
              <Select onValueChange={onChange} value={value || ''} name={name}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        );
      case 'optional':
        return (
          <Controller
            name={field.id as keyof FormValues}
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Input 
                placeholder={field.placeholder} 
                onChange={onChange}
                value={value || ''}
                name={name}
                ref={ref}
              />
            )}
          />
        );
      default:
        return (
          <Controller
            name={field.id as keyof FormValues}
            control={control}
            rules={{ required: field.required ? 'This field is required' : false }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Input 
                type={field.type} 
                onChange={onChange}
                value={value || ''}
                name={name}
                ref={ref}
              />
            )}
          />
        );
    }
  };

  if (loading) {
    return (
      <>
        <Loader customMessage="Loading your profile information" />
      </>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* Account Details Header */}
        <div className="bg-[#2413ff] text-white p-4 rounded-t-lg">
          <h3 className="text-lg font-medium">Account Details</h3>
        </div>
        
        {/* Configuration Section */}
        <div className="p-6 border-b border-gray-200">
          <h4 className="text-lg font-medium mb-4">Configuration</h4>
          <div className="grid grid-cols-1 gap-4">
            {configFields.map((field) => (
              <div key={field.id} className="mb-4 flex items-center">
                <label className="w-1/3 text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <div className="w-2/3">
                  {renderField(field)}
                  {errors[field.id as keyof FormValues] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[field.id as keyof FormValues]?.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Account Information Section */}
        <div className="p-6">
          <h4 className="text-lg font-medium mb-4">Account Information</h4>
          <div className="grid grid-cols-1 gap-4">
            {accountFields.map((field) => (
              <div key={field.id} className="mb-4 flex items-center">
                <label className="w-1/3 text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <div className="w-2/3">
                  {renderField(field)}
                  {errors[field.id as keyof FormValues] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[field.id as keyof FormValues]?.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Buttons */}
          <div className="flex items-center mt-6">
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white mr-4"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Profile"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="text-gray-700"
              onClick={() => router.push("/analysis")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;