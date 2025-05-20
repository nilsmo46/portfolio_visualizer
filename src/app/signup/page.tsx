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
import { Checkbox } from "@/components/ui/checkbox";
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import { baseURL } from '@/constants';
import { useAuth } from '@/stores/useAuth';

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
  createPassword: string;
  verifyPassword: string;
};

const SignUp: React.FC = () => {

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { verifyLogin } = useAuth();
  
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      profileType: '',
      country: '',
      marketRegion: '',
      firstName: '',
      lastName: '',
      businessEmail: '',
      company: '',
      firmType: '',
      createPassword: '',
      verifyPassword: '',
    }
  });

  const onSubmit = async (data: FormValues) => {
    const payload = {
      fullName: data.firstName + " " + data.lastName,
      businessEmail: data.businessEmail,
      password: data.verifyPassword,
      profileType: data.profileType,
      company: data.company,
      country: data.country,
      firmType: data.firmType,
      marketRegion: data.marketRegion,
    }
    try {
      const res = await axios.post(`${baseURL}/auth/signup`, payload)
      localStorage.setItem("token", res.data)
      await verifyLogin()
      router.push("/analysis")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function verifyLoginOnLoad() {
      const token = localStorage.getItem("token");
      if (token) {
        setLoading(true)
        try {
          const res = await axios.get(`${baseURL}/auth/verify`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (res.data) {
            router.push("/analysis");
          }
        } catch (error) {
          console.error("Verification failed:", error);
        } finally {
          setLoading(false)
        }
      }
    }
    verifyLoginOnLoad();
  }, [router]);

  if (loading) {
    return (
      <>
        <Loader customMessage="Please wait while we verify your credentials" />
      </>
    )
  }

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
    },
    {
      id: 'createPassword',
      label: 'Create Password',
      type: 'password',
      required: true
    },
    {
      id: 'verifyPassword',
      label: 'Verify Password',
      type: 'password',
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
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange} value={value}>
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
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder={field.placeholder} 
                onChange={onChange}
                value={value}
              />
            )}
          />
        );
      case 'password':
        return (
          <Controller
            name={field.id as keyof FormValues}
            control={control}
            rules={{ required: field.required ? 'This field is required' : false }}
            render={({ field: { onChange, value } }) => (
              <Input 
                type="password" 
                onChange={onChange}
                value={value}
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
            render={({ field: { onChange, value } }) => (
              <Input 
                type={field.type} 
                onChange={onChange}
                value={value}
              />
            )}
          />
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Sign Up for Portfolio Visualizer</h1>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl mb-2">Instructions</h2>
        <p className="text-gray-600 mb-2">
          Please enter your account information below to start your <span className="font-semibold">14-day free trial</span> with access to all features.
        </p>
        <p className="text-gray-600">
          By signing up you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
        </p>
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
          
          {/* reCAPTCHA */}
          <div className="mt-6 mb-6">
            <div className="border border-gray-300 p-4 rounded-md flex items-center">
              <Checkbox id="recaptcha" className="mr-2" />
              <label htmlFor="recaptcha" className="text-sm text-gray-700">I&apos;m not a robot</label>
              <div className="ml-auto">
                <div className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded">
                  <span className="text-xs text-gray-500">reCAPTCHA</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex items-center">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white mr-4">Sign Up</Button>
            <Button type="button" variant="outline" className="text-gray-700">Cancel</Button>
          </div>
        </div>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account? <a href="#" className="text-blue-600 hover:underline">Login »</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;