
class TodoView
  
  def self.show_details(id, todo)
    puts "Title: #{todo['title']}"
    puts "Completed: #{todo['completed']}"
    puts
  end
end
