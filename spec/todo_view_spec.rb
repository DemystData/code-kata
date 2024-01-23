# spec/todo_displayer_spec.rb
require_relative '../app/todo_view'

describe TodoView do

  describe '#display' do
    it 'displays TODO information' do
      id = 1
      todo = { 'title' => 'Sample Todo', 'completed' => true }

      expected_output = <<~OUTPUT
        Title: Sample Todo
        Completed: true

      OUTPUT

      expect { TodoView.show_details(id, todo) }.to output(expected_output).to_stdout
    end
  end
end
