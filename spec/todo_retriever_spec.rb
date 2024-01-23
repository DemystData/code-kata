require 'rspec'
require 'webmock/rspec'
require_relative '../app/todo_retriever'

RSpec.describe TodoRetriever do
  let(:todo_retriever) { TodoRetriever.new }

  describe '#fetch' do
    it 'returns TODO information for a valid ID' do
      id = 1
      stub_request(:get, "https://jsonplaceholder.typicode.com/todos/#{id}")
        .to_return(status: 200, body: '{"title": "Test Todo", "completed": true}')

      todo = todo_retriever.fetch(id)

      expect(todo['title']).to eq('Test Todo')
      expect(todo['completed']).to eq(true)
    end

    it 'raises an error for non-successful HTTP response' do
      id = 2
      stub_request(:get, "https://jsonplaceholder.typicode.com/todos/#{id}")
        .to_return(status: 404, body: 'Not Found')

      expect {
        todo_retriever.fetch(id)
      }.to raise_error(RuntimeError, /Failed to fetch TODO #2. HTTP Status Code: 404/)
    end

    it 'raises an error for network timeout' do
      id = 3
      stub_request(:get, "https://jsonplaceholder.typicode.com/todos/#{id}")
        .to_timeout

      expect {
        todo_retriever.fetch(id)
      }.to raise_error(RuntimeError, /Timeout while trying to connect to/)
    end

    it 'raises an error for invalid JSON response' do
      id = 4
      stub_request(:get, "https://jsonplaceholder.typicode.com/todos/#{id}")
        .to_return(status: 200, body: 'Invalid JSON')

      expect {
        todo_retriever.fetch(id)
      }.to raise_error(RuntimeError, /Failed to parse JSON response from/)
    end
  end
end
