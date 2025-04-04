"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Row, Stack, Text } from '@vaneui/ui';
import { Square2StackIcon, CheckIcon } from "@heroicons/react/24/outline";

interface CodeBlockActionsProps {
  code: string;
  fileName?: string;
}

export function CodeBlockActions({ code, fileName = '' }: CodeBlockActionsProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <Row xs>
        <Image src="/react-icon.svg" alt="react-icon" width={56} height={36} className="h-5 w-5" />
        {fileName && <Text sm>{fileName}</Text>}
      </Row>
      <Button xs onClick={copyToClipboard} default={!copied} success={copied}>
        {copied ? <CheckIcon className="w-5 h-5" /> : <Square2StackIcon className="w-5 h-5" />}
        {copied ? "Copied!" : "Copy"}
      </Button>
    </>
  );
} 
