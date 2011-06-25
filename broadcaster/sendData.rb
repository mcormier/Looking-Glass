#!/usr/bin/env ruby

require 'net/http'

http = Net::HTTP.new("127.0.0.1", 8080)
http.use_ssl = false

headers = {
  'Content-Type' => 'text/xml;charset=UTF-8',
  'Host' => '127.0.0.1' + ':' + '8080' 
}
  

resp, data = http.post("/", "blah blah", headers)

puts 'Response code = ' + resp.code
puts 'Message = ' + resp.message

puts data
