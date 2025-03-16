import React from 'react';
import { Col, Row, Text, Title, Section, Container } from 'vaneui';
import { ComponentDocsProps } from '../types';

export function ComponentDocs({
  componentName,
  description,
  component: Component,
  propCategories,
  examples,
  importStatement
}: ComponentDocsProps) {
  return (
    <Col>
      <Title>{componentName}</Title>
      <Text lg>{description}</Text>
      
      {/* Import Example */}
      <Section className="my-8">
        <Title sm>Import</Title>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <code>{importStatement}</code>
        </pre>
      </Section>

      {/* Examples */}
      <Section className="my-8">
        <Title sm>Examples</Title>
        {examples.map((example, index) => (
          <Col key={index} className="mt-6 border rounded-md p-6">
            <Text secondary>{example.title}</Text>
            <Text sm>{example.description}</Text>
            
            <div className="my-4 p-4 flex justify-center items-center border rounded-md bg-white">
              {example.component}
            </div>
            
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <code>{example.code}</code>
            </pre>
          </Col>
        ))}
      </Section>

      {/* Props Documentation */}
      <Section className="my-8">
        <Title sm>Props</Title>
        
        {propCategories.map((category, catIndex) => (
          <Col key={catIndex} className="mt-6">
            <Text secondary uppercase>{category.title}</Text>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prop</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {category.props.map((prop, propIndex) => (
                    <tr key={propIndex}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {prop.name}
                        {prop.required && <span className="text-red-500 ml-1">*</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prop.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prop.defaultValue || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        ))}
      </Section>
    </Col>
  );
} 