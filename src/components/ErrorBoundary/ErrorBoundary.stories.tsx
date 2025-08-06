import type { Meta, StoryFn } from "@storybook/react-vite";
import ErrorBoundary from "./ErrorBoundary";
import { Component } from "react";

const meta: Meta<typeof ErrorBoundary> = {
  title: "Components/ErrorBoundary",
  component: ErrorBoundary,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    children: {
      table: { disable: true },
    },
  },
};

export default meta;

// Component that throws an error when flag is true
class ErrorThrowingComponent extends Component<{ shouldThrow: boolean }> {
  render() {
    if (this.props.shouldThrow) {
      throw new Error("This is a test error!");
    }
    return (
      <div className='rounded-lg bg-green-100 p-8'>
        <h2 className='mb-4 text-2xl font-bold text-green-800'>✅ Component Working Normally</h2>
        <p className='text-green-700'>This component is working fine. No errors here!</p>
        <div className='mt-4 rounded border bg-white p-4'>
          <h3 className='mb-2 font-semibold'>Normal Content:</h3>
          <ul className='list-inside list-disc space-y-1 text-sm'>
            <li>Users can interact with this content</li>
            <li>All functionality works as expected</li>
            <li>No JavaScript errors occurred</li>
          </ul>
        </div>
      </div>
    );
  }
}

const Template: StoryFn<typeof ErrorBoundary> = (args) => <ErrorBoundary {...args} />;

export const WithNormalComponent = Template.bind({});
WithNormalComponent.args = {
  children: <ErrorThrowingComponent shouldThrow={false} />,
};

export const WithErrorComponent = Template.bind({});
WithErrorComponent.args = {
  children: <ErrorThrowingComponent shouldThrow={true} />,
};

export const WithMultipleChildren = Template.bind({});
WithMultipleChildren.args = {
  children: (
    <div className='space-y-6 p-6'>
      <h1 className='text-3xl font-bold'>Multiple Components</h1>
      <ErrorThrowingComponent shouldThrow={false} />
      <div className='rounded bg-blue-100 p-4'>
        <p className='text-blue-800'>Another normal component working fine.</p>
      </div>
    </div>
  ),
};

export const CustomErrorPage = () => (
  <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
    <ErrorBoundary>
      <ErrorThrowingComponent shouldThrow={true} />
    </ErrorBoundary>
  </div>
);

export const NestedErrorBoundaries = () => (
  <div className='space-y-6 p-6'>
    <h1 className='text-2xl font-bold'>Nested Error Boundaries</h1>

    <ErrorBoundary>
      <div className='rounded-lg border border-gray-300 p-4'>
        <h2 className='mb-3 text-lg font-semibold'>First Boundary (Working)</h2>
        <ErrorThrowingComponent shouldThrow={false} />
      </div>
    </ErrorBoundary>

    <ErrorBoundary>
      <div className='rounded-lg border border-red-300 p-4'>
        <h2 className='mb-3 text-lg font-semibold'>Second Boundary (Has Error)</h2>
        <ErrorThrowingComponent shouldThrow={true} />
      </div>
    </ErrorBoundary>

    <ErrorBoundary>
      <div className='rounded-lg border border-green-300 p-4'>
        <h2 className='mb-3 text-lg font-semibold'>Third Boundary (Working)</h2>
        <ErrorThrowingComponent shouldThrow={false} />
      </div>
    </ErrorBoundary>
  </div>
);

export const Interactive = () => {
  return (
    <div className='space-y-6 p-6'>
      <h1 className='text-2xl font-bold'>Error Boundary Demo</h1>
      <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
        <h3 className='mb-2 font-semibold text-yellow-800'>Instructions:</h3>
        <p className='text-sm text-yellow-700'>
          The component below is wrapped in an ErrorBoundary. When an error occurs, instead of the entire app crashing,
          the ErrorBoundary catches it and shows a fallback error page.
        </p>
      </div>

      <ErrorBoundary>
        <div className='rounded-lg border border-gray-300 p-6'>
          <h2 className='mb-4 text-xl font-semibold'>Protected Component</h2>
          <p className='mb-4 text-gray-600'>This component will throw an error to demonstrate the ErrorBoundary.</p>
          <ErrorThrowingComponent shouldThrow={true} />
        </div>
      </ErrorBoundary>

      <div className='space-y-1 text-sm text-gray-500'>
        <p>
          <strong>Expected behavior:</strong>
        </p>
        <p>• Instead of a white screen of death, you should see a custom error page</p>
        <p>• The error page shows "500 Error!" with a "Go Home" button</p>
        <p>• The rest of the application continues to work normally</p>
        <p>• Check the browser console to see the logged error details</p>
      </div>
    </div>
  );
};
