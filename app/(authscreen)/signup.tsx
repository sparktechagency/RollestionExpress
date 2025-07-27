// import { eyecloseicon, eyeopenicon, googleicon } from '@/assets/icon/Icon'
// import { useRouter } from 'expo-router'
// import React, { useState } from 'react'
// import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import { SvgXml } from 'react-native-svg'
// import tw from 'twrnc'

// const signup = () => {
//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [passwordConfird, setPasswordConfird] = useState('')
//     const [showPassword, setShowPassword] = useState(false)
//     const [showPasswordConfird, setShowPasswordConfird] = useState(false)
//     const router = useRouter();
//     return (
//         <View style={tw`flex-1 bg-[#151515] px-6`}>


//             {/* Logo Section */}
//             <View style={tw`items-center mt-20 `}>
//                 <Image
//                     source={require('../../assets/images/logo.png')}
//                     resizeMode='none'
//                     style={tw`flex flex-row items-center justify-center w-[250px] h-[100px]`}
//                 />

//             </View>

//             {/* Email Input */}
//             <View style={tw`mb-2`}>
//                 <Text style={tw`text-white text-base mb-1`}>Name</Text>
//                 <TextInput
//                     style={tw`bg-[#4B4B4B] text-white px-4 h-[52px] rounded-xl text-base`}
//                     placeholder="Enter full name"
//                     placeholderTextColor="#9CA3AF"
//                     value={name}
//                     onChangeText={setName}
//                     keyboardType="name-phone-pad"
//                     autoCapitalize="none"
//                 />
//             </View>
//             <View style={tw`mb-2`}>
//                 <Text style={tw`text-white text-base mb-1`}>Email</Text>
//                 <TextInput
//                     style={tw`bg-[#4B4B4B] text-white px-4 h-[52px] rounded-xl text-base`}
//                     placeholder="Enter email"
//                     placeholderTextColor="#9CA3AF"
//                     value={email}
//                     onChangeText={setEmail}
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                 />
//             </View>

//             {/* Password Input */}
//             <View style={tw`mb-4`}>
//                 <Text style={tw`text-white text-base mb-1`}>Password</Text>
//                 <View style={tw`relative`}>
//                     <TextInput
//                         style={tw`bg-[#4B4B4B] text-white px-4 h-[52px] rounded-xl text-base pr-12`}
//                         placeholder="Enter password"
//                         placeholderTextColor="#9CA3AF"
//                         value={password}
//                         onChangeText={setPassword}
//                         secureTextEntry={!showPassword}
//                     />
//                     <TouchableOpacity
//                         style={tw`absolute right-4 top-4`}
//                         onPress={() => setShowPassword(!showPassword)}
//                     >
//                         <SvgXml xml={`${showPassword ? eyecloseicon : eyeopenicon}`} />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//             <View style={tw`mb-4`}>
//                 <Text style={tw`text-white text-base mb-1`}>Confirm Password</Text>
//                 <View style={tw`relative`}>
//                     <TextInput
//                         style={tw`bg-[#4B4B4B] text-white px-4 h-[52px] rounded-xl text-base pr-12`}
//                         placeholder="Confirm password"
//                         placeholderTextColor="#9CA3AF"
//                         value={passwordConfird}
//                         onChangeText={setPasswordConfird}
//                         secureTextEntry={!showPasswordConfird}
//                     />
//                     <TouchableOpacity
//                         style={tw`absolute right-4 top-4`}
//                         onPress={() => setShowPasswordConfird(!showPasswordConfird)}
//                     >
//                         <SvgXml xml={`${showPasswordConfird ? eyecloseicon : eyeopenicon}`} />
//                     </TouchableOpacity>
//                 </View>
//             </View>



//             {/* Sign In Button */}
//             <TouchableOpacity onPress={() => router.push('/(authscreen)/confirmRegistration')} style={tw`bg-blue-500 h-[56px] flex items-center justify-center rounded-xl mb-2 mt-6`}>
//                 <Text style={tw`text-white text-center text-lg font-semibold`}>Continue</Text>
//             </TouchableOpacity>

//             {/* Or Sign in with */}
//             <Text style={tw`text-gray-400 text-center text-base mb-6`}>Or Sign in with</Text>

//             {/* Google Sign In Button */}
//             <TouchableOpacity style={tw` items-center mb-auto`}>
//                 <SvgXml xml={googleicon} />
//             </TouchableOpacity>

//             {/* Sign Up Link */}
//             <View style={tw`flex-row justify-center pb-8`}>
//                 <Text style={tw`text-gray-400 text-base`}>Already have an account? </Text>
//                 <TouchableOpacity onPress={() => router.push('/(authscreen)/login')}>
//                     <Text style={tw`text-blue-400 text-base`}>Sign in</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }

// export default signup


import { eyecloseicon, eyeopenicon, googleicon } from '@/assets/icon/Icon'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import tw from 'twrnc'
// --- New Code: Import the dropdown component ---
import DropDownPicker from 'react-native-dropdown-picker'

const signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfird, setPasswordConfird] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfird, setShowPasswordConfird] = useState(false)
    const router = useRouter();

    // --- New Code: State for the dropdown ---
    const [companyOpen, setCompanyOpen] = useState(false);
    const [companyValue, setCompanyValue] = useState(null);
    const [companyItems, setCompanyItems] = useState([
        { label: 'Google', value: 'google' },
        { label: 'Facebook', value: 'facebook' },
        { label: 'Apple', value: 'apple' },
        { label: 'Microsoft', value: 'microsoft' },
        { label: 'Amazon', value: 'amazon' }
    ]);


    return (
        // --- Modified: Added ScrollView to prevent overflow with open dropdown ---
        <ScrollView
            style={tw`flex-1 bg-[#151515]`}
            contentContainerStyle={tw`px-6`}
            keyboardShouldPersistTaps="handled"
        >
            {/* Logo Section */}
            <View style={tw`items-center mt-20 `}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    resizeMode='none'
                    style={tw`flex flex-row items-center justify-center w-[250px] h-[100px]`}
                />
            </View>

            {/* Name Input */}
            <View style={tw`mb-2`}>
                <Text style={tw`text-white text-base mb-1`}>Name</Text>
                <TextInput
                    style={tw`bg-[#4B4B4B] text-white px-4 h-[52px] rounded-xl text-base`}
                    placeholder="Enter full name"
                    placeholderTextColor="#9CA3AF"
                    value={name}
                    onChangeText={setName}
                    keyboardType="name-phone-pad"
                    autoCapitalize="none"
                />
            </View>

            {/* Email Input */}
            <View style={tw`mb-2`}>
                <Text style={tw`text-white text-base mb-1`}>Email</Text>
                <TextInput
                    style={tw`bg-[#4B4B4B] text-white px-4 h-[52px] rounded-xl text-base`}
                    placeholder="Enter email"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            {/* --- New Code: Company Dropdown --- */}
            {/* The zIndex is important to make sure the dropdown list appears over other elements */}
            <View style={tw`mb-2 z-10`}>
                <Text style={tw`text-white text-base mb-1`}>Company</Text>
                <DropDownPicker
                    open={companyOpen}
                    value={companyValue}
                    items={companyItems}
                    setOpen={setCompanyOpen}
                    setValue={setCompanyValue}
                    setItems={setCompanyItems}
                    placeholder="Select a company"
                    theme="DARK"
                    style={tw`bg-[#4B4B4B] border-0 rounded-xl h-[52px]`}
                    textStyle={tw`text-white text-base`}
                    placeholderStyle={tw`text-[#9CA3AF]`}
                    dropDownContainerStyle={tw`bg-[#4B4B4B] border-0`}
                />
            </View>

            {/* Password Input */}
            <View style={tw`mb-4`}>
                <Text style={tw`text-white text-base mb-1`}>Password</Text>
                <View style={tw`relative`}>
                    <TextInput
                        style={tw`bg-[#4B4B4B] text-white px-4 h-[52px] rounded-xl text-base pr-12`}
                        placeholder="Enter password"
                        placeholderTextColor="#9CA3AF"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={tw`absolute right-4 top-4`}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <SvgXml xml={`${showPassword ? eyecloseicon : eyeopenicon}`} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Confirm Password Input */}
            <View style={tw`mb-4`}>
                <Text style={tw`text-white text-base mb-1`}>Confirm Password</Text>
                <View style={tw`relative`}>
                    <TextInput
                        style={tw`bg-[#4B4B4B] text-white px-4 h-[52px] rounded-xl text-base pr-12`}
                        placeholder="Confirm password"
                        placeholderTextColor="#9CA3AF"
                        value={passwordConfird}
                        onChangeText={setPasswordConfird}
                        secureTextEntry={!showPasswordConfird}
                    />
                    <TouchableOpacity
                        style={tw`absolute right-4 top-4`}
                        onPress={() => setShowPasswordConfird(!showPasswordConfird)}
                    >
                        <SvgXml xml={`${showPasswordConfird ? eyecloseicon : eyeopenicon}`} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Continue Button */}
            <TouchableOpacity onPress={() => router.push('/(authscreen)/confirmRegistration')} style={tw`bg-blue-500 h-[56px] flex items-center justify-center rounded-xl mb-2 mt-6`}>
                <Text style={tw`text-white text-center text-lg font-semibold`}>Continue</Text>
            </TouchableOpacity>

            {/* Or Sign in with */}
            <Text style={tw`text-gray-400 text-center text-base mb-6`}>Or Sign in with</Text>

            {/* Google Sign In Button */}
            <TouchableOpacity style={tw` items-center mb-auto`}>
                <SvgXml xml={googleicon} />
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={tw`flex-row justify-center pb-8 mt-4`}>
                <Text style={tw`text-gray-400 text-base`}>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/(authscreen)/login')}>
                    <Text style={tw`text-blue-400 text-base`}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default signup;