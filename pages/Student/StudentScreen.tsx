import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const documentsData = [
  { id: '1', type: 'Attestation', title: 'Attestation scolaire 2025', date: '2025-09-01' },
  { id: '2', type: 'Bulletin', title: 'Bulletin de notes semestre 1', date: '2025-08-15' },
  { id: '3', type: 'Convention', title: 'Convention de stage', date: '2025-09-10' },
  // ... more docs
];

const filterTypes = ['All', 'Attestation', 'Bulletin', 'Convention'];

export default function StudentDashboard() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Filter & search documents
  const filteredDocs = documentsData.filter(doc => {
    return (filter === 'All' || doc.type === filter) &&
      doc.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      {/* Profile and Welcome */}
      <View className="flex-row items-center mt-6 mb-4">
        <Image
          source={require('')}
          className="w-16 h-16 rounded-full"
        />
        <View className="ml-4">
          <Text className="text-xl font-bold">Welcome back, Student!</Text>
          <Text className="text-gray-600">Here are your documents and notifications</Text>
        </View>
      </View>

      {/* Quick Links */}
      <View className="flex-row justify-between mt-4 mb-6">
        {['My Documents', 'Requests', 'Notifications'].map(label => (
          <TouchableOpacity
            key={label}
            className="bg-teal-600 rounded-lg flex-1 mx-1 py-4 items-center"
            onPress={() => {
              // Navigate to respective screens or handle action
            }}
          >
            <Text className="text-white font-medium">{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Overview */}
      <View className="flex-row justify-around bg-teal-100 p-4 rounded-lg mb-6">
        <View className="items-center">
          <Text className="text-3xl font-bold">{documentsData.length}</Text>
          <Text>Documents</Text>
        </View>
        <View className="items-center">
          <Text className="text-3xl font-bold">2</Text>
          <Text>Pending Requests</Text>
        </View>
      </View>

      {/* Filters and Search */}
      <View className="flex-row mb-3">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filterTypes.map(type => (
            <TouchableOpacity
              key={type}
              className={`rounded-full border px-4 py-2 mr-2 ${filter === type ? 'bg-teal-600 border-teal-600' : 'border-gray-300'}`}
              onPress={() => setFilter(type)}
            >
              <Text className={filter === type ? 'text-white' : 'text-gray-700'}>{type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TextInput
        placeholder="Search documents..."
        className="border border-gray-300 rounded-xl px-4 py-2 mb-4"
        value={search}
        onChangeText={setSearch}
      />

      {/* Document List */}
      <FlatList
        data={filteredDocs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="border-b border-gray-200 py-3"
            onPress={() => setSelectedDoc(item)}
          >
            <Text className="font-semibold text-base">{item.title}</Text>
            <Text className="text-gray-500 text-sm">{item.date}</Text>
            <Text className="text-gray-600 text-xs mt-1">{item.type}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text className="text-center text-gray-400">No documents found.</Text>}
        style={{ maxHeight: 240 }}
      />

      {/* Document Viewer (Simple Preview Placeholder) */}
      {selectedDoc && (
        <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-300 shadow-lg h-60">
          <Text className="font-bold text-lg mb-2">{selectedDoc.title}</Text>
          <Text className="mb-4 text-gray-600">Preview document content here (PDF/Word)</Text>
          <View className="flex-row justify-around">
            <TouchableOpacity className="bg-teal-600 rounded-lg px-6 py-2">
              <Text className="text-white">Download</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-teal-600 rounded-lg px-6 py-2">
              <Text className="text-white">Share</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedDoc(null)} className="px-6 py-2">
              <Text className="text-teal-600 font-semibold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
