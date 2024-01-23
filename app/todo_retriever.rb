require 'net/http'
require 'json'

class TodoRetriever
  BASE_URL = 'https://jsonplaceholder.typicode.com'

  def fetch(id)
    url = build_url(id)
    response = get_response(url)
    validate_response(id, response)
    JSON.parse(response.body)
  rescue Net::OpenTimeout
    timeout_error(url)
  rescue JSON::ParserError
    invalid_json_error(url)
  end

  private

  def build_url(id)
    "#{BASE_URL}/todos/#{id}"
  end

  def get_response(url)
    Net::HTTP.get_response(URI(url))
  end

  def validate_response(id, response)
    raise "Failed to fetch TODO ##{id}. HTTP Status Code: #{response.code}" unless response.is_a?(Net::HTTPSuccess)
    raise "Error: Empty response body for TODO ##{id}" if response.body.nil? || response.body.empty?
  end
  
  def timeout_error(url)
    raise "Error: Timeout while trying to connect to #{url}. Please check your network connection."
  end

  def invalid_json_error(url)
    raise "Error: Failed to parse JSON response from #{url}. Ensure the response is valid JSON."
  end
end
