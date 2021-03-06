#!/usr/bin/env ruby

require 'net/http'

if ARGV.length < 1
  puts "Usage: sendData.rb commandString" 
  puts "----"
  puts "Example: sendData.rb \"il 1 2 x\" "
  exit
end

http = Net::HTTP.new("127.0.0.1", 8080)
http.use_ssl = false

headers = {
  'Content-Type' => 'text/xml;charset=UTF-8',
  'Host' => '127.0.0.1' + ':' + '8080' 
}
  

# insert the letter x at line 1 col 2
#resp, data = http.post("/", "il 1 2 x", headers)
resp, data = http.post("/", ARGV[0], headers)

puts 'Response code = ' + resp.code
puts 'Message = ' + resp.message

puts data
