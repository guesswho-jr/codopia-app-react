import React from 'react';
import SyntaxHighlighter from 'react-native-syntax-highlighter'; // 2.0.0
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useEffect, useState } from 'react';
import { Circle } from "react-native-progress"
import { StyleSheet, View } from 'react-native';
import { unzip } from "react-native-zip-archive"
import { cacheDirectory, getInfoAsync, makeDirectoryAsync, readDirectoryAsync } from 'expo-file-system';
import { FlatList } from 'react-native';
import { Ionicons } from "@expo/vector-icons"

import { calc } from '../utils/getResponsive';
import { download } from '../api/project';
import CodText from '../components/CodText';
import CrossView from '../components/CrossView';
import ErrorPage from '../components/ErrorPage';
import { readContents, returnFileType } from '../utils/file';
import CodFile from '../components/FileInd';
import { Link } from 'expo-router';
import CrossButton from '../components/CrossButton';


export default function App({ file_path }: { file_path: string }) {
  console.log(file_path);

  const [downloadedFile, setDownloadedFile] = useState({
    progress: 0,
    uri: ""
  })
  const [error, setError] = useState(false)
  const [extractedFiles, setExtractedFiles] = useState<string[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [code, setCode] = useState<{ type: string, text: string }>({

    type: "javascript",
    text: "console.log('cannot find your code')"
  })
  useEffect(() => {
    try {
      download(file_path, setDownloadedFile)
    }
    catch (Error) {

      setError(true)
    }

  }, [])
  const path = `${cacheDirectory}/temp`
  const unzipFile = async () => {

    try {
      if (!(await getInfoAsync(path)).isDirectory) {
        await makeDirectoryAsync(path)
      }
      if ((await getInfoAsync(downloadedFile.uri)).exists) {

        await unzip(downloadedFile.uri, path)

        setExtractedFiles([])
        const files = await readDirectoryAsync(path)
        console.log(files);

        setExtractedFiles(files)

      }
      else {
        console.log(downloadedFile);

      }
    }
    catch (e) {
      console.log(e);

      setError(true)
    }
    finally {
      setLoading(false)
    }
  }
  const setFileData = async (file: string) => {
    setLoading(true)
    try {
      const content = await readContents(`${path}/${file}`)
      setCode({ text: content, type: returnFileType(file) ?? "javascript" })
    }
    catch (E) {
      setError(true)
    }
    finally {
      setLoading(false)
    }
  }
  if (downloadedFile.progress < 1) return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
      <CodText>Processing...</CodText>
      <Circle progress={downloadedFile.progress} animated style={styles.progressBar} thickness={10} size={calc(100, 'width')} />
    </View>
  )
  if (error) return <ErrorPage body='Unexpected Error occured' retry={() => setError(false)} title='Oh No!' />
  if (!extractedFiles) return (
    <View style={{ width: "80%" }}>
      <CrossButton title='Prepare files' onPress={unzipFile} />
    </View>
  )
  return (
    <CrossView>

      <View style={{ height: '100%' }}>
        <View style={{ height: "10%", backgroundColor: "rgba(0,0,0,0.85)" }}>
          <Link href={"/dashboard/"} style={{ color: "#fff" }} asChild>
            <Ionicons size={calc(50, "height")} name='arrow-back' color={"#fff"} />
          </Link>
          <FlatList data={extractedFiles} horizontal
            style={{ height: calc(200, "height") }}
            renderItem={({ item }) => (
              <CodFile file_name={item} onPressed={() => setFileData(item)} />

            )

            } />
        </View>
        <SyntaxHighlighter
          style={materialDark}
          customStyle={{ padding: 10, margin: 0, height: "90%" }}
          language={code.type}
          fontSize={calc(13, "height")}
          highlighter="prism"
        >
          {loading ? "// Loading your code" : code.text}
        </SyntaxHighlighter>
      </View>
    </CrossView>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  progressBar: {
    alignSelf: "center"
  }
});



