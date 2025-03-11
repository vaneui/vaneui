import React from 'react';
import { Button } from 'vaneui';
//import { Button } from './../../../../../src/components/ui/button';


export default function ButtonDocs() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Button Component</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
        <div className="flex gap-4 mb-4">
          <Button md>Default Button</Button>
          <Button md primary>Primary Button</Button>
          <Button md danger>Danger Button</Button>
        </div>
        <pre className="bg-gray-100 p-4 rounded-md">
          {`<Button md>Default Button</Button>
<Button md primary>Primary Button</Button>
<Button md danger>Danger Button</Button>`}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
        <div className="flex items-center gap-4 mb-4">
          <Button xs>Extra Small</Button>
          <Button sm>Small</Button>
          <Button md>Medium</Button>
          <Button lg>Large</Button>
          <Button xl>Extra Large</Button>
        </div>
        <pre className="bg-gray-100 p-4 rounded-md">
          {`<Button xs>Extra Small</Button>
<Button sm>Small</Button>
<Button md>Medium</Button>
<Button lg>Large</Button>
<Button xl>Extra Large</Button>`}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Font Weights</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <Button md thin>Thin</Button>
          <Button md light>Light</Button>
          <Button md normal>Normal</Button>
          <Button md medium>Medium</Button>
          <Button md semibold>Semibold</Button>
          <Button md bold>Bold</Button>
          <Button md extrabold>Extra Bold</Button>
          <Button md black>Black</Button>
        </div>
        <pre className="bg-gray-100 p-4 rounded-md">
          {`<Button md thin>Thin</Button>
<Button md light>Light</Button>
<Button md normal>Normal</Button>
<Button md medium>Medium</Button>
<Button md semibold>Semibold</Button>
<Button md bold>Bold</Button>
<Button md extrabold>Extra Bold</Button>
<Button md black>Black</Button>`}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 p-2 text-left">Prop</th>
              <th className="border border-gray-200 p-2 text-left">Type</th>
              <th className="border border-gray-200 p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 p-2">children</td>
              <td className="border border-gray-200 p-2">ReactNode</td>
              <td className="border border-gray-200 p-2">Button content</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-2">xs, sm, md, lg, xl</td>
              <td className="border border-gray-200 p-2">boolean</td>
              <td className="border border-gray-200 p-2">Size variants</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-2">thin...black</td>
              <td className="border border-gray-200 p-2">boolean</td>
              <td className="border border-gray-200 p-2">Font weight variants</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
} 