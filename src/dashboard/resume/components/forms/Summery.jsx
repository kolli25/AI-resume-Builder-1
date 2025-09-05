import React, { useContext, useState, useEffect } from 'react';
import { Button } from '../../../../components/ui/button';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import GlobalApi from '../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { LoaderCircle, Brain } from 'lucide-react';
import { toast } from 'sonner'; // Make sure this is imported
import { AIChatSession } from '../../../../../service/AIModel';

const prompt = "Job Title: {jobTitle}, depends upon the fresher, medium, experience level, I want you to give me the summery for job title in 4-5 lines";

function Summery({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState('');
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState([]);

    useEffect(() => {
        if (summery) {
            setResumeInfo({
                ...resumeInfo,
                summery: summery
            });
        }
    }, [summery]);

    const GenerateSummeryFromAI = async () => {
        try {
            setLoading(true);
            const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle || '');
            console.log('Prompt:', PROMPT);

            const result = await AIChatSession.sendMessage(PROMPT);
            const text = await result.response.text(); // 🛠 FIXED: await the response.text()
            const parsed = JSON.parse(text);

            console.log('Parsed AI Response:', parsed);
            setAiGeneratedSummeryList(parsed);
        } catch (error) {
            console.error('Error parsing AI response:', error);
            toast.error('Failed to generate summary');
        } finally {
            setLoading(false);
        }
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            data: {
                summery: summery
            }
        };

        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
            (resp) => {
                console.log(resp);
                enabledNext(true);
                setLoading(false);
                toast.success('Details updated');
            },
            (error) => {
                console.error('Error updating:', error);
                toast.error('Failed to update details');
                setLoading(false);
            }
        );
    };

    return (
        <div>
            <div className='p-5 rounded-lg shadow-lg border-t-4 mt-10 bg-white' style={{ borderColor: '#646cffaa' }}>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p className='text-sm text-gray-600'>Add summary for your preferred job</p>

                <form className='mt-6' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summary</label>
                        <Button
                            size="sm"
                            onClick={GenerateSummeryFromAI}
                            type="button"
                            className="order border-blue-500 text-blue-100 px-4 py-2 rounded hover:bg-blue-50 flex gap-2"
                        >
                            <Brain className="h-4 w-4" /> Generate From AI
                        </Button>
                    </div>

                    <textarea
                        name="summary"
                        required
                        rows="6"
                        placeholder="Write your summary here..."
                        value={summery}
                        onChange={(e) => setSummery(e.target.value)}
                        className="mt-5 w-full px-4 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className='mt-2 flex justify-end'>
                        <Button type='submit' disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin h-5 w-5' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>

            {aiGeneratedSummeryList && aiGeneratedSummeryList.length > 0 && (
                <div className='mt-6'>
                    <h2 className='font-bold text-lg mb-2'>Suggestions</h2>
                    {aiGeneratedSummeryList.map((item, index) => (
                        <div key={index} className='border p-3 rounded mb-2 bg-gray-50'>
                            <h3 className='font-semibold text-sm'>Level: {item?.experienceLevel}</h3>
                            <p className='text-sm mt-1'>{item?.summery}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Summery;
