import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import InputFile from "./InputFile";

const meta: Meta<typeof InputFile> = {
  title: "Components/InputFile",
  component: InputFile,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

const Template: StoryFn<typeof InputFile> = (args) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileChange = (file?: File) => {
    setSelectedFile(file || null);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl("");
    }

    if (args.onChange) {
      args.onChange(file);
    }
  };

  return (
    <div className='space-y-4 p-6'>
      <InputFile {...args} onChange={handleFileChange} />

      {selectedFile && (
        <div className='space-y-2'>
          <p className='text-sm font-medium'>Tệp đã chọn:</p>
          <div className='rounded border bg-gray-50 p-3'>
            <p className='text-sm'>
              <strong>Tên:</strong> {selectedFile.name}
            </p>
            <p className='text-sm'>
              <strong>Kích thước:</strong> {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
            <p className='text-sm'>
              <strong>Loại:</strong> {selectedFile.type}
            </p>
          </div>
        </div>
      )}

      {previewUrl && (
        <div className='space-y-2'>
          <p className='text-sm font-medium'>Xem trước:</p>
          <img src={previewUrl} alt='Preview' className='h-32 w-32 rounded border object-cover' />
        </div>
      )}
    </div>
  );
};

export const Default = Template.bind({});

export const WithCallback = Template.bind({});
WithCallback.args = {
  onChange: (file?: File) => {
    console.log("File selected:", file);
  },
};

export const ProfileAvatarUpload = () => {
  const [avatar, setAvatar] = useState<string>("https://via.placeholder.com/100x100?text=Avatar");
  const [uploading, setUploading] = useState(false);

  const handleAvatarChange = async (file?: File) => {
    if (file) {
      setUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        setAvatar(url);
        setUploading(false);
      }, 1000);
    }
  };

  return (
    <div className='max-w-md p-6'>
      <div className='space-y-4 rounded-lg border bg-white p-6'>
        <h3 className='text-lg font-semibold'>Thay đổi ảnh đại diện</h3>

        <div className='flex items-center space-x-4'>
          <div className='relative'>
            <img src={avatar} alt='Avatar' className='h-20 w-20 rounded-full border-2 border-gray-200 object-cover' />
            {uploading && (
              <div className='absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50'>
                <div className='h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
              </div>
            )}
          </div>

          <div className='space-y-2'>
            <InputFile onChange={handleAvatarChange} />
            <p className='text-xs text-gray-500'>
              Dung lượng tối đa 1MB
              <br />
              Định dạng: .JPEG, .PNG
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MultipleFileUploads = () => {
  const [files, setFiles] = useState<Array<{ id: number; file: File; preview: string }>>([]);
  const [nextId, setNextId] = useState(1);

  const addFile = (file?: File) => {
    if (file) {
      const newFile = {
        id: nextId,
        file,
        preview: URL.createObjectURL(file),
      };
      setFiles((prev) => [...prev, newFile]);
      setNextId((prev) => prev + 1);
    }
  };

  const removeFile = (id: number) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className='max-w-2xl p-6'>
      <div className='space-y-6'>
        <div>
          <h3 className='mb-4 text-lg font-semibold'>Upload nhiều ảnh</h3>
          <InputFile onChange={addFile} />
        </div>

        {files.length > 0 && (
          <div className='space-y-4'>
            <h4 className='font-medium'>Ảnh đã chọn ({files.length})</h4>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
              {files.map((fileItem) => (
                <div key={fileItem.id} className='group relative'>
                  <img
                    src={fileItem.preview}
                    alt={fileItem.file.name}
                    className='h-32 w-full rounded border object-cover'
                  />
                  <button
                    onClick={() => removeFile(fileItem.id)}
                    className='absolute right-2 top-2 h-6 w-6 rounded-full bg-red-500 text-sm text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100'
                  >
                    ×
                  </button>
                  <div className='absolute bottom-0 left-0 right-0 rounded-b bg-black bg-opacity-50 p-2 text-xs text-white'>
                    {fileItem.file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const FileValidation = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const addMessage = (message: string) => {
    setMessages((prev) => [...prev.slice(-4), message]);
  };

  const handleFileChange = (file?: File) => {
    if (!file) {
      addMessage("Không có tệp nào được chọn");
      return;
    }

    addMessage(`✅ Tệp hợp lệ: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
  };

  return (
    <div className='max-w-md space-y-4 p-6'>
      <div>
        <h3 className='mb-2 text-lg font-semibold'>Test File Validation</h3>
        <p className='mb-4 text-sm text-gray-600'>Thử upload các loại tệp khác nhau để xem validation hoạt động.</p>
        <InputFile onChange={handleFileChange} />
      </div>

      <div className='space-y-2'>
        <h4 className='font-medium'>Quy tắc validation:</h4>
        <ul className='space-y-1 text-sm text-gray-600'>
          <li>• Chỉ chấp nhận file ảnh (.jpg, .jpeg, .png)</li>
          <li>• Dung lượng tối đa: 1MB</li>
          <li>• Sẽ hiển thị toast error nếu vi phạm</li>
        </ul>
      </div>

      {messages.length > 0 && (
        <div className='space-y-2'>
          <h4 className='font-medium'>Log:</h4>
          <div className='max-h-32 overflow-y-auto rounded border bg-gray-50 p-3'>
            {messages.map((message, index) => (
              <div key={index} className='text-sm'>
                {message}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
