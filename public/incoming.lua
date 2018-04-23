 _ = require "moses"
json = require "json"

input = {}

if (_.isEmpty(input) == true ) then
  print("its not json")
else
  print(input.name)
end


if (session:ready() == true) then
    -- send http request to client server
	session:execute("curl","http://localhost:8585/api/did");
	res = session:getVariable("curl_response_data")
    -- check response status 
	if (_.isEmpty(res) == false ) then
		-- parse JSON into lua table
       result = json.parse(res)
       -- sort based on step
       r = _.sortBy(result, 'step')
        
       for k,v in pairs(r) do
       	print(k)
       -- each key value
       	_.each(v, function(p,s) 

       		print(s) 
       	end)
       	print(v.url)
       	 if (r[k]=="play") then
       	 	 -- check url key 
       	 	if (_.isEmpty(v.url)==false) then
       	 	   session:execute('playback',v.url);
       	    end

       	 end

       end
       -- for end
	else
    -- result = json.parse(res)
    print("its return empty result")

    end

end



