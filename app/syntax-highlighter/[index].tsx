import React from 'react';
import SyntaxHighlighter from '../screens/Highlighter';
import { useLocalSearchParams } from 'expo-router';

export default function Page() {

    const { index: file_path } = useLocalSearchParams()

    return <SyntaxHighlighter file_path={file_path as string} />
};
