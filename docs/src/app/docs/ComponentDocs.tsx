"use client";

import React from 'react';
import { Col, Row, Text, Title, Section, Container, SectionTitle, PageTitle } from 'vaneui';
import { ComponentDocsProps } from './types';
import { CodeBlock } from '../components/CodeBlock';

export function ComponentDocs({
  componentName,
  description,
  propCategories,
  examples,
  importStatement
}: ComponentDocsProps) {

  return (
    <Col xl>
      <Col>
        <PageTitle sm>{componentName}</PageTitle>
        <Text lg>{description}</Text>
      </Col>

      {/* Import Example */}
      <Col>
        <Title sm>Import</Title>
        <CodeBlock 
          code={importStatement} 
          language="typescript"
          fileName="Import Statement"
        />
      </Col>

      {/* Examples */}
      <Col>
        <Title>Examples</Title>
        {examples.map((example, index) => (
          <Col key={index} className="border rounded-xl p-6">
            <Title sm>{example.title}</Title>
            <Text>{example.description}</Text>
            <Col itemsCenter className="px-4 py-8 border rounded-md overflow-x-auto w-full">
              {example.component}
            </Col>
            <CodeBlock 
              code={example.code} 
              language="tsx"
              fileName={`${componentName}${example.title ? ' - ' + example.title : ''}.tsx`}
            />
          </Col>
        ))}
      </Col>

      {/* Props Documentation */}
      <Col lg>
        <Title sm>Props</Title>
        {propCategories.map((category, catIndex) => (
          <Col key={catIndex}>
            <Text secondary uppercase>{category.title}</Text>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="min-w-44 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prop</th>
                    <th scope="col" className="min-w-44 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="min-w-44 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                    <th scope="col" className="min-w-44 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {category.props.map((prop, propIndex) => (
                    <tr key={propIndex}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {prop.name}
                        {prop.required && <span className="text-red-500 ml-1">*</span>}
                      </td>
                      <td className="px-6 py-4 font-mono whitespace-nowrap text-sm text-gray-500">{prop.type}</td>
                      <td className="px-6 py-4 font-mono whitespace-nowrap text-sm text-gray-500">{prop.defaultValue || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        ))}
      </Col>
    </Col>
  );
} 