
import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export const FixLogo: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus('uploading');
    const formData = new FormData();
    formData.append('logo', file);

    try {
      const response = await fetch('/api/fix-logo', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setMessage('Logo updated successfully! Facebook will now be able to see it.');
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Social Sharing Fixer</h1>
          <p className="text-slate-600">Upload your logo here to fix the Facebook preview issue.</p>
        </div>

        <div className="space-y-6">
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center">
            <input
              type="file"
              id="logo-upload"
              className="hidden"
              accept="image/png"
              onChange={handleFileChange}
            />
            <label
              htmlFor="logo-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-sm font-medium text-slate-900">
                {file ? file.name : 'Click to select logo (PNG only)'}
              </span>
            </label>
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || status === 'uploading'}
            className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              !file || status === 'uploading'
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
            }`}
          >
            {status === 'uploading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading...
              </>
            ) : (
              'Upload & Fix Logo'
            )}
          </button>

          {status === 'success' && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-sm text-emerald-700 font-medium">{message}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <p className="text-sm text-rose-700 font-medium">{message}</p>
            </div>
          )}

          <div className="text-xs text-slate-400 text-center">
            <p>After uploading, please wait 5 minutes for the system to sync.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
